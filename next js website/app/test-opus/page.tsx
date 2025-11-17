'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_WORKFLOW_ID = process.env.NEXT_PUBLIC_OPUS_WORKFLOW_ID || '5sLHcgw7N9gVv5lz';

interface WorkflowSchema {
  jobPayloadSchema: Record<string, any>;
  workflowBlueprint?: any;
  executionEstimation?: any;
  [key: string]: any;
}

export default function OpusTestPage() {
  const [workflowId, setWorkflowId] = useState(DEFAULT_WORKFLOW_ID);
  const [workflowSchema, setWorkflowSchema] = useState<WorkflowSchema | null>(null);
  const [jobExecutionId, setJobExecutionId] = useState('');
  const [jobTitle, setJobTitle] = useState('Test Job');
  const [jobDescription, setJobDescription] = useState('Testing Opus workflow');
  const [jobInputs, setJobInputs] = useState<Record<string, any>>({});
  const [jobStatus, setJobStatus] = useState('');
  const [jobResults, setJobResults] = useState<any>(null);
  const [auditLog, setAuditLog] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [autoPolling, setAutoPolling] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'failed'>('idle');

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev]);
  };

  // Auto-populate default values when schema is loaded
  useEffect(() => {
    if (workflowSchema?.jobPayloadSchema) {
      const defaultInputs: Record<string, any> = {};
      Object.keys(workflowSchema.jobPayloadSchema).forEach(key => {
        const schema = workflowSchema.jobPayloadSchema[key];
        if (schema.value) {
          defaultInputs[key] = schema.value;
        }
      });
      setJobInputs(defaultInputs);
      addLog('✅ Default values populated from workflow schema');
    }
  }, [workflowSchema]);

  // Auto-poll job status when enabled
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPolling && jobExecutionId && jobStatus !== 'COMPLETED' && jobStatus !== 'FAILED') {
      addLog('🔄 Auto-polling enabled');
      interval = setInterval(() => {
        getJobStatus();
      }, 5000); // Poll every 5 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPolling, jobExecutionId, jobStatus]);

  // 0. Test API Connection
  const testConnection = async () => {
    setConnectionStatus('testing');
    addLog('Testing Opus API connection...');
    try {
      const response = await fetch('/api/opus/test-connection');
      const data = await response.json();

      if (data.success) {
        setConnectionStatus('success');
        addLog(`✅ Connection successful! (${data.responseTime})`);
        addLog(`Workflow found: ${data.workflowName}`);
      } else {
        setConnectionStatus('failed');
        addLog(`❌ Connection failed: ${data.error || data.message}`);
        if (data.errorCause) addLog(`Cause: ${data.errorCause}`);
      }
      
      console.log('Connection test result:', data);
    } catch (error: any) {
      setConnectionStatus('failed');
      addLog(`❌ Connection test error: ${error.message}`);
      console.error('Connection test error:', error);
    }
  };

  // 1. Get Workflow Details & Schema
  const fetchWorkflowSchema = async () => {
    setLoading(true);
    addLog(`Fetching workflow schema for ID: ${workflowId}`);
    try {
      const response = await fetch(`/api/opus/workflow/${workflowId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch workflow: ${response.statusText}`);
      }

      const data = await response.json();
      setWorkflowSchema(data);
      addLog('✅ Workflow schema fetched successfully');
      console.log('Workflow Schema:', data);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error fetching workflow:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Initiate Job
  const initiateJob = async () => {
    setLoading(true);
    addLog('Initiating job...');
    try {
      const response = await fetch(`/api/opus/job/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: workflowId,
          title: jobTitle,
          description: jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        addLog(`❌ Error ${response.status}: ${data.error || response.statusText}`);
        if (data.details) addLog(`Details: ${data.details}`);
        if (data.cause) addLog(`Cause: ${data.cause}`);
        throw new Error(data.error || `Failed to initiate job: ${response.statusText}`);
      }

      setJobExecutionId(data.jobExecutionId);
      addLog(`✅ Job initiated successfully. ID: ${data.jobExecutionId}`);
      console.log('Job Initiated:', data);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error initiating job:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. Upload File
  const uploadFile = async (file: File, inputId: string) => {
    setLoading(true);
    addLog(`Uploading file: ${file.name}`);
    try {
      // Step 1: Get presigned URL
      const fileExtension = '.' + file.name.split('.').pop();
      const presignResponse = await fetch(`/api/opus/job/file/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileExtension: fileExtension,
          accessScope: 'organization',
        }),
      });

      if (!presignResponse.ok) {
        throw new Error(`Failed to get presigned URL: ${presignResponse.statusText}`);
      }

      const { presignedUrl, fileUrl } = await presignResponse.json();
      addLog('✅ Presigned URL obtained');

      // Step 2: Upload file to presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${uploadResponse.statusText}`);
      }

      setUploadedFiles(prev => ({ ...prev, [inputId]: fileUrl }));
      addLog(`✅ File uploaded successfully: ${fileUrl}`);
      console.log('File uploaded:', fileUrl);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Execute Job
  const executeJob = async () => {
    if (!jobExecutionId) {
      addLog('❌ Error: No job execution ID. Please initiate a job first.');
      return;
    }

    setLoading(true);
    addLog('Executing job...');
    try {
      // Build jobPayloadSchemaInstance from jobInputs
      const jobPayloadSchemaInstance: Record<string, any> = {};
      
      if (workflowSchema?.jobPayloadSchema) {
        Object.keys(workflowSchema.jobPayloadSchema).forEach(key => {
          const schema = workflowSchema.jobPayloadSchema[key];
          const inputValue = jobInputs[key];
          
          if (inputValue !== undefined && inputValue !== '') {
            jobPayloadSchemaInstance[key] = {
              value: schema.type === 'file' ? uploadedFiles[key] : inputValue,
              type: schema.type,
            };
          }
        });
      }

      const response = await fetch(`/api/opus/job/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobExecutionId: jobExecutionId,
          jobPayloadSchemaInstance: jobPayloadSchemaInstance,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to execute job: ${response.statusText}`);
      }

      const data = await response.json();
      addLog('✅ Job execution started successfully');
      console.log('Job Executed:', data);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error executing job:', error);
    } finally {
      setLoading(false);
    }
  };

  // 5. Get Job Status
  const getJobStatus = async () => {
    if (!jobExecutionId) {
      addLog('❌ Error: No job execution ID');
      return;
    }

    setLoading(true);
    addLog('Checking job status...');
    try {
      const response = await fetch(`/api/opus/job/${jobExecutionId}/status`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to get job status: ${response.statusText}`);
      }

      const data = await response.json();
      setJobStatus(data.status);
      addLog(`✅ Job status: ${data.status}`);
      console.log('Job Status:', data);

      // Auto-fetch results if completed
      if (data.status === 'COMPLETED') {
        setAutoPolling(false);
        addLog('🎉 Job completed! Fetching results...');
        await getJobResults();
      } else if (data.status === 'FAILED') {
        setAutoPolling(false);
        addLog('❌ Job failed!');
      }
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error getting job status:', error);
    } finally {
      setLoading(false);
    }
  };

  // 6. Get Job Results
  const getJobResults = async () => {
    if (!jobExecutionId) {
      addLog('❌ Error: No job execution ID');
      return;
    }

    setLoading(true);
    addLog('Fetching job results...');
    try {
      const response = await fetch(`/api/opus/job/${jobExecutionId}/results`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to get job results: ${response.statusText}`);
      }

      const data = await response.json();
      setJobResults(data);
      addLog('✅ Job results fetched successfully');
      console.log('Job Results:', data);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error getting job results:', error);
    } finally {
      setLoading(false);
    }
  };

  // 7. Get Job Audit Log
  const getJobAuditLog = async () => {
    if (!jobExecutionId) {
      addLog('❌ Error: No job execution ID');
      return;
    }

    setLoading(true);
    addLog('Fetching audit log...');
    try {
      const response = await fetch(`/api/opus/job/${jobExecutionId}/audit`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to get audit log: ${response.statusText}`);
      }

      const data = await response.json();
      setAuditLog(data);
      addLog('✅ Audit log fetched successfully');
      console.log('Audit Log:', data);
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`);
      console.error('Error getting audit log:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setJobInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file, key);
    }
  };

  // Quick Run - Execute entire workflow
  const quickRun = async () => {
    try {
      addLog('🚀 Starting quick run...');
      
      // Step 1: Fetch schema if not already loaded
      if (!workflowSchema) {
        await fetchWorkflowSchema();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for state update
      }

      // Step 2: Initiate job
      await initiateJob();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Execute job
      await executeJob();
      
      // Step 4: Enable auto-polling
      setAutoPolling(true);
      addLog('✅ Quick run initiated. Auto-polling enabled.');
    } catch (error: any) {
      addLog(`❌ Quick run failed: ${error.message}`);
    }
  };

  const renderInputField = (key: string, schema: any) => {
    const { type, display_name, is_nullable, value: defaultValue } = schema;

    switch (type) {
      case 'str':
        // Check if it's a textarea field (job description)
        const isLongText = display_name.toLowerCase().includes('description') || 
                          display_name.toLowerCase().includes('job');
        
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            {isLongText ? (
              <Textarea
                value={jobInputs[key] || defaultValue || ''}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={`Enter ${display_name}`}
                rows={6}
              />
            ) : (
              <Input
                type="text"
                value={jobInputs[key] || defaultValue || ''}
                onChange={(e) => handleInputChange(key, e.target.value)}
                placeholder={`Enter ${display_name}`}
              />
            )}
          </div>
        );

      case 'float':
      case 'int':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Input
              type="number"
              value={jobInputs[key] || ''}
              onChange={(e) => handleInputChange(key, parseFloat(e.target.value))}
              placeholder={`Enter ${display_name}`}
            />
          </div>
        );

      case 'bool':
        return (
          <div key={key} className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={jobInputs[key] || false}
                onChange={(e) => handleInputChange(key, e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">
                {display_name} {!is_nullable && <span className="text-red-500">*</span>}
              </span>
            </label>
          </div>
        );

      case 'date':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Input
              type="date"
              value={jobInputs[key] || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
            />
          </div>
        );

      case 'file':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Input
              type="file"
              onChange={(e) => handleFileUpload(key, e)}
              className="mb-2"
            />
            {uploadedFiles[key] && (
              <p className="text-xs text-green-600">✅ Uploaded: {uploadedFiles[key]}</p>
            )}
          </div>
        );

      case 'array':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} (comma-separated) {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Input
              type="text"
              value={Array.isArray(jobInputs[key]) ? jobInputs[key].join(', ') : ''}
              onChange={(e) => handleInputChange(key, e.target.value.split(',').map(s => s.trim()))}
              placeholder="item1, item2, item3"
            />
          </div>
        );

      case 'object':
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} (JSON) {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Textarea
              value={typeof jobInputs[key] === 'object' ? JSON.stringify(jobInputs[key], null, 2) : ''}
              onChange={(e) => {
                try {
                  handleInputChange(key, JSON.parse(e.target.value));
                } catch {
                  // Invalid JSON, store as string for now
                }
              }}
              placeholder='{"key": "value"}'
              rows={4}
            />
          </div>
        );

      default:
        return (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {display_name} {!is_nullable && <span className="text-red-500">*</span>}
            </label>
            <Input
              type="text"
              value={jobInputs[key] || ''}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={`Enter ${display_name}`}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Opus.com Workflow API Test</h1>
          <Button 
            onClick={quickRun} 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
            size="lg"
          >
            🚀 Quick Run Full Workflow
          </Button>
        </div>

        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <span className="font-semibold">Important:</span> If you see &ldquo;Workflow is not active&rdquo; error, you need to activate your workflow in the Opus dashboard:
              </p>
              <ol className="text-xs text-yellow-700 mt-2 ml-4 list-decimal space-y-1">
                <li>Go to <a href="https://app.opus.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">app.opus.com</a></li>
                <li>Navigate to your workflow (ID: {workflowId})</li>
                <li>Click the &ldquo;Activate&rdquo; or &ldquo;Enable&rdquo; button</li>
                <li>Return here and try again</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            {/* Step 0: Test Connection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">0. Test API Connection</h2>
              <div className="space-y-4">
                <Button 
                  onClick={testConnection} 
                  disabled={connectionStatus === 'testing'}
                  className={`w-full ${
                    connectionStatus === 'success' ? 'bg-green-600 hover:bg-green-700' :
                    connectionStatus === 'failed' ? 'bg-red-600 hover:bg-red-700' :
                    ''
                  }`}
                >
                  {connectionStatus === 'testing' ? '🔄 Testing...' :
                   connectionStatus === 'success' ? '✅ Connection OK' :
                   connectionStatus === 'failed' ? '❌ Connection Failed - Retry' :
                   '🔌 Test Connection'}
                </Button>
                {connectionStatus !== 'idle' && (
                  <p className="text-xs text-gray-600 text-center">
                    {connectionStatus === 'success' 
                      ? 'Your API key and network connection are working correctly.'
                      : connectionStatus === 'failed'
                      ? 'Check your API key and network connection. See logs for details.'
                      : 'Testing connection to Opus API...'}
                  </p>
                )}
              </div>
            </div>

            {/* Step 1: Get Workflow Schema */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">1. Get Workflow Schema</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Workflow ID</label>
                  <Input
                    type="text"
                    value={workflowId}
                    onChange={(e) => setWorkflowId(e.target.value)}
                    placeholder="Enter workflow ID"
                  />
                </div>
                <Button onClick={fetchWorkflowSchema} disabled={loading} className="w-full">
                  Fetch Workflow Schema
                </Button>
              </div>
            </div>

            {/* Step 2: Initiate Job */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">2. Initiate Job</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <Input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Description</label>
                  <Textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button onClick={initiateJob} disabled={loading || !workflowSchema} className="w-full">
                  Initiate Job
                </Button>
                {jobExecutionId && (
                  <p className="text-sm text-green-600">Job ID: {jobExecutionId}</p>
                )}
              </div>
            </div>

            {/* Step 3: Configure Job Inputs */}
            {workflowSchema?.jobPayloadSchema && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">3. Configure Job Inputs</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.keys(workflowSchema.jobPayloadSchema).map(key =>
                    renderInputField(key, workflowSchema.jobPayloadSchema[key])
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Execute Job */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">4. Execute Job</h2>
              <Button 
                onClick={executeJob} 
                disabled={loading || !jobExecutionId} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Execute Job
              </Button>
            </div>

            {/* Step 5: Monitor Job */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">5. Monitor Job</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="autoPolling"
                    checked={autoPolling}
                    onChange={(e) => setAutoPolling(e.target.checked)}
                    className="w-4 h-4"
                    disabled={!jobExecutionId}
                  />
                  <label htmlFor="autoPolling" className="text-sm font-medium">
                    Auto-poll status (every 5s)
                  </label>
                </div>
                <Button onClick={getJobStatus} disabled={loading || !jobExecutionId} className="w-full">
                  Check Status Manually
                </Button>
                {jobStatus && (
                  <div className={`p-3 rounded ${
                    jobStatus === 'COMPLETED' ? 'bg-green-50 border border-green-200' :
                    jobStatus === 'FAILED' ? 'bg-red-50 border border-red-200' :
                    jobStatus === 'IN PROGRESS' ? 'bg-blue-50 border border-blue-200' :
                    'bg-gray-50 border border-gray-200'
                  }`}>
                    <p className="text-sm font-medium">
                      Status: <span className={
                        jobStatus === 'COMPLETED' ? 'text-green-600' :
                        jobStatus === 'FAILED' ? 'text-red-600' :
                        jobStatus === 'IN PROGRESS' ? 'text-blue-600' :
                        'text-gray-600'
                      }>{jobStatus}</span>
                    </p>
                  </div>
                )}
                <Button onClick={getJobResults} disabled={loading || !jobExecutionId || jobStatus !== 'COMPLETED'} className="w-full">
                  Get Results
                </Button>
                <Button onClick={getJobAuditLog} disabled={loading || !jobExecutionId} className="w-full">
                  Get Audit Log
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Output */}
          <div className="space-y-6">
            {/* Logs */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Activity Log</h2>
                <Button onClick={() => setLogs([])} variant="outline" size="sm">
                  Clear
                </Button>
              </div>
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-xs h-64 overflow-y-auto">
                {logs.map((log, idx) => (
                  <div key={idx} className="mb-1">{log}</div>
                ))}
                {logs.length === 0 && <div className="text-gray-500">No activity yet...</div>}
              </div>
            </div>

            {/* Workflow Info Display */}
            {workflowSchema && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Workflow Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Name</p>
                    <p className="text-sm font-medium">{workflowSchema.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Description</p>
                    <p className="text-sm">{workflowSchema.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Industry</p>
                    <p className="text-sm">{workflowSchema.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Required Inputs</p>
                    <p className="text-sm font-medium">
                      {workflowSchema.jobPayloadSchema && Object.keys(workflowSchema.jobPayloadSchema).length} fields
                    </p>
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                      View Full Schema
                    </summary>
                    <div className="bg-gray-100 p-4 rounded overflow-x-auto mt-2">
                      <pre className="text-xs">{JSON.stringify(workflowSchema, null, 2)}</pre>
                    </div>
                  </details>
                </div>
              </div>
            )}

            {/* Job Results Display */}
            {jobResults && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Job Results</h2>
                <div className="bg-gray-100 p-4 rounded overflow-x-auto">
                  <pre className="text-xs">{JSON.stringify(jobResults, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* Audit Log Display */}
            {auditLog && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Job Execution Audit</h2>
                <div className="space-y-4">
                  {/* Execution Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Total Nodes</p>
                      <p className="text-2xl font-bold text-blue-600">{auditLog.nb_nodes || 0}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Executed</p>
                      <p className="text-2xl font-bold text-green-600">{auditLog.nb_executed_nodes || 0}</p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Remaining</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {auditLog.remaining_nodes_to_execute?.length || 0}
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-xs text-gray-600">Failed</p>
                      <p className="text-2xl font-bold text-red-600">{auditLog.nb_failed_nodes || 0}</p>
                    </div>
                  </div>

                  {/* Currently Running Node */}
                  {auditLog.running_node && (
                    <div className="bg-purple-50 border border-purple-200 p-3 rounded">
                      <p className="text-xs text-purple-600 uppercase font-semibold">Currently Running</p>
                      <p className="text-sm font-medium text-purple-900">{auditLog.running_node}</p>
                    </div>
                  )}

                  {/* Executed Nodes */}
                  {auditLog.executed_nodes && auditLog.executed_nodes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Executed Nodes</h3>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {auditLog.executed_nodes.map((node: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2 bg-green-50 p-2 rounded text-xs">
                            <span className="text-green-600">✓</span>
                            <span className="text-gray-700">{node}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Failed Nodes */}
                  {auditLog.failed_nodes && auditLog.failed_nodes.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-red-600">Failed Nodes</h3>
                      <div className="space-y-1">
                        {auditLog.failed_nodes.map((node: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2 bg-red-50 p-2 rounded text-xs">
                            <span className="text-red-600">✗</span>
                            <span className="text-gray-700">{node}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Remaining Nodes */}
                  {auditLog.remaining_nodes_to_execute && auditLog.remaining_nodes_to_execute.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2 text-yellow-600">Remaining Nodes</h3>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {auditLog.remaining_nodes_to_execute.map((node: string, idx: number) => (
                          <div key={idx} className="flex items-center space-x-2 bg-yellow-50 p-2 rounded text-xs">
                            <span className="text-yellow-600">○</span>
                            <span className="text-gray-700">{node}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full JSON View */}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                      View Full Audit Data
                    </summary>
                    <div className="bg-gray-100 p-4 rounded overflow-x-auto mt-2">
                      <pre className="text-xs">{JSON.stringify(auditLog, null, 2)}</pre>
                    </div>
                  </details>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

