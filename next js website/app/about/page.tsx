"use client"

import { Navbar } from '@/components/navbar'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen bg-white text-black">
                <div className="mx-auto max-w-4xl px-8 pt-32 pb-20 font-mono text-sm leading-relaxed">
                    {/* Main Content */}
                    <article className="space-y-12">
                        {/* Title */}
                        <section>
                            <h1 className="text-3xl font-bold mb-8">MakeMyCv - AI-Native CV Builder</h1>
                        </section>

                        {/* Workflow Links */}
                        <section className="mb-8 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                            <h2 className="text-lg font-semibold mb-3">Opus Workflows</h2>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm mb-1">
                                        <strong>1st workflow</strong> (present in the website):
                                    </p>
                                    <Link 
                                        href="https://app.opus.com/app/workflow/share/697ebcf7-1c14-4ff1-9b54-7ed615563a99"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 hover:text-red-400 underline text-sm break-all"
                                    >
                                        https://app.opus.com/app/workflow/share/697ebcf7-1c14-4ff1-9b54-7ed615563a99
                                    </Link>
                                </div>
                                <div>
                                    <p className="text-sm mb-1">
                                        <strong>2nd workflow</strong> (if want review):
                                    </p>
                                    <Link 
                                        href="https://app.opus.com/app/workflow/share/3d0b2ffa-b820-41ee-91f1-812d0c2069b3"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-red-500 hover:text-red-400 underline text-sm break-all"
                                    >
                                        https://app.opus.com/app/workflow/share/3d0b2ffa-b820-41ee-91f1-812d0c2069b3
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Project Explanation Video */}
                        <section>
                            <div className="mb-8">
                                <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        src="https://www.youtube.com/embed/7CJ3GqxGJ4Q"
                                        title="MakeMyCv Project Explanation"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Introduction */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Introduction</h2>
                            <p className="mb-4">
                                Developers already maintain living portfolios on{' '}
                                <Link href="https://github.com" className="text-red-500 hover:text-red-400 underline">
                                    GitHub
                                </Link>
                                ,{' '}
                                <Link href="https://linkedin.com" className="text-red-500 hover:text-red-400 underline">
                                    LinkedIn
                                </Link>
                                , and social platforms, yet they still spend hours rewriting the same information into resumes that keep changing for every new job description. Instead of asking users to start from a blank page or choose from dozens of cosmetic templates, MakeMyCv treats the resume as a workflow problem:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Intake scattered, multi-format signals from the web,</li>
                                <li>Understand what they say about the person,</li>
                                <li>Decide what is relevant for a specific role,</li>
                                <li>Review it for quality and safety, and</li>
                                <li>Deliver a traceable, production-quality document.</li>
                            </ul>
                            <p className="mb-4">
                                MakeMyCv is an AI-native CV builder that automates this entire chain using one standard, battle-tested developer resume template that engineers across companies already trust, while{' '}
                                <Link href="https://opus.ai" className="text-red-500 hover:text-red-400 underline">
                                    Opus.ai
                                </Link>
                                {' '}handles the logic, branching, and review steps underneath.
                            </p>
                            <p className="mb-4">
                                It is a reusable, auditable Intake → Understand → Decide → Review → Deliver automation that happens to output a resume, but can be adapted to any domain where you need to turn noisy inputs into a precise, high-stakes document.
                            </p>
                        </section>

                        {/* The Problem We Address */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">The Problem We Address</h2>
                            <p className="mb-4">
                                Manual resume creation, especially for developers, suffers from recurring issues:
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>Slow, repetitive writing:</strong></p>
                            <p className="mb-4 ml-8">
                                Converting{' '}
                                <Link href="https://github.com" className="text-red-500 hover:text-red-400 underline">
                                    GitHub
                                </Link>
                                {' '}projects and experience into strong, outcome-focused bullets takes time, and most people end up with generic copy.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>Personalization vs. ATS constraints:</strong></p>
                            <p className="mb-4 ml-8">
                                Each job requires custom content and keywords, but CVs still need to remain simple enough for Applicant Tracking Systems to parse.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>No traceability:</strong></p>
                            <p className="mb-4 ml-8">
                                It&apos;s hard to know which data sources, projects, or rules led to a specific CV version, making iteration, debugging, and compliance difficult.
                            </p>
                            
                            <p className="mb-4">
                                MakeMyCv automates this process end-to-end, while keeping a clear record of inputs, decisions, and outputs.
                            </p>
                        </section>

                        {/* How the System Works */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">How the System Works: Intake → Understand → Decide → Review → Deliver</h2>
                            <p className="mb-4">
                                MakeMyCv is designed around a single, reusable pipeline that turns public developer data into a final{' '}
                                <Link href="https://www.latex-project.org/" className="text-red-500 hover:text-red-400 underline">
                                    LaTeX
                                </Link>
                                {' '}resume. Under the hood, it follows the Intake → Understand → Decide → Review → Deliver pattern.
                            </p>
                            
                            <h3 className="text-lg font-semibold mb-2 mt-6">1. Intake</h3>
                            <p className="mb-4 ml-4">
                                The process starts when the user submits their details through the web app:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>GitHub username</li>
                                <li>LinkedIn profile URL</li>
                                <li>Twitter/X handle (optional)</li>
                                <li>Target job description (plain text)</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                The{' '}
                                <Link href="https://nextjs.org/" className="text-red-500 hover:text-red-400 underline">
                                    Next.js
                                </Link>
                                {' '}frontend validates these inputs and sends them to the FastAPI backend, which creates a new job and triggers an Opus workflow run.
                            </p>
                            <p className="mb-4 ml-4">
                                At this point, Opus kicks off four workflows in parallel:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Analyse Repos</li>
                                <li>Get X Posts</li>
                                <li>Get LinkedIn Posts</li>
                                <li>Get LinkedIn Profile Details</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Running these simultaneously helps keep the overall latency low while gathering as much signal as possible.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">2. Understand</h3>
                            <p className="mb-4 ml-4">
                                In the Understand phase, the system enriches and structures all incoming data.
                            </p>
                            <p className="mb-2 ml-4"><strong>Analyse Repos</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Uses the GitHub handle to fetch repositories.</li>
                                <li>Analyzes codebases and READMEs (via{' '}
                                    <Link href="https://gitingest.com/" className="text-red-500 hover:text-red-400 underline">
                                        GitIngest
                                    </Link>
                                ) to extract tech stack, project purpose, and key contributions.</li>
                            </ul>
                            <p className="mb-2 ml-4"><strong>Get X Posts</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Collects recent Twitter/X posts.</li>
                                <li>Identifies recurring technical topics, tools, and communities the user engages with.</li>
                            </ul>
                            <p className="mb-2 ml-4"><strong>Get LinkedIn Posts</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Fetches recent LinkedIn posts related to work, projects, or achievements.</li>
                                <li>Surfaces extra context that can support project highlights or achievements.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                These three workflows complete independently and then send their outputs into a single workflow:
                            </p>
                            <p className="mb-2 ml-4"><strong>Project Repo CV Summarizer</strong></p>
                            <p className="mb-4 ml-8">
                                This summarizer workflow understands the user&apos;s technical footprint by:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-12 mb-4">
                                <li>Combining repository analysis with social signals.</li>
                                <li>Producing concise project summaries and a refined skills map suitable for a CV.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                <span className="text-red-500 font-semibold">(All of these processes run in parallel)</span>
                            </p>
                            <p className="mb-2 ml-4"><strong>Get LinkedIn Profile Details</strong></p>
                            <p className="mb-4 ml-8">
                                Extracts core profile information: positions, companies, dates, locations, and education.
                            </p>
                            <p className="mb-4 ml-8">
                                Its output is sent to:
                            </p>
                            <p className="mb-2 ml-4"><strong>Extract User Profile Details</strong></p>
                            <p className="mb-4 ml-8">
                                This workflow understands the user&apos;s professional history by:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-12 mb-4">
                                <li>Cleaning and normalizing titles, company names, and date ranges.</li>
                                <li>structuring experience and education into a format ready for a chronological resume.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                By the end of this phase, we have:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>A project + skills layer from Project Repo CV Summarizer</li>
                                <li>A profile + experience + education layer from Extract User Profile Details</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">3. Decide</h3>
                            <p className="mb-4 ml-4">
                                The Decide phase combines these two layers and shapes them into a coherent CV draft.
                            </p>
                            <p className="mb-4 ml-4">
                                The CV Final Output Generation workflow takes as input:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Summarized repositories, projects, and skills</li>
                                <li>Cleaned LinkedIn profile details, work experience, and education</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Within this workflow, AI agents and rule-based logic decide:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Which projects to highlight as key portfolio items.</li>
                                <li>Which roles and experiences should appear (and in what order).</li>
                                <li>How to group skills into clear categories (languages, frameworks, tools, etc.).</li>
                                <li>How to write a short professional summary aligned with the job description.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                The result is a fully structured CV draft with:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Summary</li>
                                <li>Skills</li>
                                <li>Work experience entries with bullet points</li>
                                <li>Project sections based on real repos</li>
                                <li>Education and other relevant details</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                This draft remains in a structured, machine-readable format so it can be further checked and transformed.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">4. Review</h3>
                            <p className="mb-4 ml-4">
                                The review logic lives entirely inside the backend Opus workflow.
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>The website workflow focuses on intake, generation, LaTeX conversion, and live editing.</li>
                                <li>It does not include a dedicated AI or human review step, to keep the production flow simpler and avoid the errors and complexities we ran into when we tried to wire review into the website pipeline.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                We offer another workflow which includes a review system. This was not included in the website because of its complex implementation. The whole process remains the same till the last second step before finalizing.
                            </p>
                            <p className="mb-4 ml-4">
                                All review happens in the Opus workflow, which includes both AI Review and Human Review.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>AI Review:</strong></p>
                            <p className="mb-4 ml-8">
                                Inside the backend Opus workflow, the generated CV draft is first sent to an AI review agent that checks it against ATS guidelines and best practices.
                            </p>
                            <p className="mb-4 ml-8">
                                The AI review:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-12 mb-4">
                                <li>Evaluates structure and section ordering</li>
                                <li>Checks keyword coverage against the job description</li>
                                <li>Looks at clarity and length of bullet points</li>
                                <li>Ensures basic ATS-friendly formatting</li>
                            </ul>
                            
                            <p className="mb-2 ml-4"><strong>Human Review:</strong></p>
                            <p className="mb-4 ml-8">
                                The same Opus workflow also includes a Human Review process to demonstrate human-in-the-loop control.
                            </p>
                            <p className="mb-4 ml-8">
                                To test it:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-12 mb-4">
                                <li>Open the backend Opus workflow.</li>
                                <li>Locate and run the Human Review step.</li>
                                <li>The generated CV text is shown as part of that task.</li>
                                <li>The reviewer then chooses:
                                    <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
                                        <li>Accept → the original CV text is approved and used as-is, or</li>
                                        <li>Reject → they edit the CV text as needed and submit; the updated version replaces the original.</li>
                                    </ul>
                                </li>
                            </ul>
                            
                            <p className="mb-4 ml-4">
                                This design keeps the website workflow stable and straightforward for end users, while the Opus workflow showcases a full AI + human review pipeline suitable for higher-stakes or low-confidence cases.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">5. Deliver</h3>
                            <p className="mb-4 ml-4">
                                The Deliver phase converts the reviewed CV into a professional document and returns it to the user.
                            </p>
                            <p className="mb-2 ml-4"><strong>Custom Agent → LaTeX Conversion</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>The structured CV draft is sent to a Custom Agent.</li>
                                <li>This agent&apos;s job is to convert the content into LaTeX code that matches our single, standard developer resume template, which is ATS-friendly and widely used in the industry.</li>
                            </ul>
                            <p className="mb-2 ml-4"><strong>Backend Compilation & Output</strong></p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>The FastAPI backend receives the LaTeX from the workflow.</li>
                                <li>It compiles the LaTeX using{' '}
                                    <Link href="https://tectonic-typesetting.github.io/" className="text-red-500 hover:text-red-400 underline">
                                        Tectonic
                                    </Link>
                                {' '}to generate a high-quality PDF.</li>
                                <li>The backend returns both the PDF and the LaTeX source to the frontend.</li>
                            </ul>
                            <p className="mb-2 ml-4"><strong>User Downloads</strong></p>
                            <p className="mb-4 ml-8">
                                The user can:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-12 mb-4">
                                <li>Preview the resume.</li>
                                <li>Download the PDF for direct use.</li>
                                <li>Edit the LaTeX code live in the built-in editor, re-run the compilation, and see the updated PDF instantly.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Through this Intake → Understand → Decide → Review → Deliver chain, MakeMyCv turns scattered public data (repos, posts, profile details) into a single, consistent, LaTeX-based resume that is ready to use in real job applications.
                            </p>
                        </section>

                        {/* Steps in Backend Opus Workflow */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Steps in Backend Opus Workflow:</h2>
                            <p className="mb-4">
                                MakeMyCv is powered by a set of functions that run in parallel and then converge to generate a complete, LaTeX-based developer resume. Each function has a focused responsibility:
                            </p>
                            
                            {/* Final Audit Output Example */}
                            <div className="mb-6">
                                <details className="border border-zinc-300 rounded-lg p-3">
                                    <summary className="cursor-pointer font-semibold text-sm text-red-500">
                                        View Final Example Audit Output
                                    </summary>
                                    <div className="mt-3">
                                        <pre className="text-black text-xs overflow-x-auto bg-zinc-50 p-3 rounded leading-tight">
{`{
  "nb_nodes": 11,
  "remaining_nodes_to_execute": [
    "Workflow Input",
    "Workflow Output",
    "Get-Linkedin-Profile-Deatils",
    "Get-Linkedin-Posts",
    "Get-X-Posts",
    "Analyse-Repos",
    "Extract User Profile Details",
    "Project Repo CV Summarizer",
    "CV Final Output Generation",
    "Final_resume",
    "Custom Agent"
  ],
  "running_node": "",
  "executed_nodes": [
    "Workflow Input",
    "Get-Linkedin-Profile-Deatils",
    "Get-X-Posts",
    "Extract User Profile Details",
    "Get-Linkedin-Posts",
    "Analyse-Repos",
    "Project Repo CV Summarizer",
    "CV Final Output Generation",
    "Final_resume",
    "Custom Agent",
    "Workflow Output"
  ],
  "nb_executed_nodes": 11,
  "failed_nodes": [],
  "nb_failed_nodes": 0,
  "audit": {
    "nodes_execution_data": {
      "Workflow Input": {
        "execution_status": "COMPLETED",
        "execution_start_time": 1763374603736,
        "execution_time": 1,
        "execution_index": 0,
        "execution_output": [
          {
            "workflow_input_kywzun45y": "https://github.com/yashwanth-3000/MakeMyCv",
            "workflow_input_b6wxg8qkt": "https://github.com/yashwanth-3000/content--hub",
            "workflow_input_i4i825m16": "https://github.com/yashwanth-3000/Mathemagica",
            "workflow_input_qior8st0v": "https://www.linkedin.com/in/pyashwanthkrishna/",
            "workflow_input_mj5wlva02": "yashwanthstwt",
            "workflow_input_3loh6ags2": "Design, build, and optimize autonomous AI agents for real-world tasks and workflows.\nIntegrate LLMs, APIs, retrieval systems, and tool-use capabilities into agent pipelines.\nDevelop agent reasoning, planning, and multi-step task-execution logic.\nImplement monitoring, evaluation, and continuous improvement for agent reliability.\nWork with cross-functional teams to embed agents into products and operations.\nCreate scalable architectures for agent orchestration and multi-agent collaboration.\nEnsure data security, compliance, and performance efficiency across agent systems.\nResearch emerging frameworks to innovate and upgrade agentic capabilities."
          },
          {
            "jobExecutionId": "3115"
          }
        ]
      },
      "Get-Linkedin-Profile-Deatils": {
        "execution_status": "COMPLETED",
        "execution_start_time": 1763374603739,
        "execution_time": 6024,
        "execution_index": 1,
        "execution_output": [
          {
            "serviceResponse": "{\"success\":true,\"profile\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":\"https://media.licdn.com/dms/image/v2/D5616AQHTRKPoFCTtVg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1719645431211?e=1764806400&v=beta&t=fpYaoQNO5zDYt_3Mypsik6xiqtW29f4mBOQWIrx43ls\",\"profile_type\":\"personal\",\"open_to_work\":false,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"birth_date\":null,\"summary\":\"As a Generative AI Developer, I specialize in crafting innovative solutions that streamline workflows and enhance user experiences. My technical expertise includes developing AI agents, integrating various AI APIs such as OpenAI, ElevenLabs, and Llama, and utilizing Large Language Models (LLMs) to build intelligent applications. I have experience with Supabase for backend development, leveraging its real-time capabilities and seamless integration with Node.js. \\n\\nMy projects reflect a passion for harnessing AI's potential. For instance, Text2Story is an AI-driven platform that transforms textbook lessons into engaging animated videos, enhancing children's education. Content Hub automates social media content creation across major platforms, streamlining the process for users.\\nI have been recognized for my work in various competitions. I won the Grand Prize at the Hypermode Knowledge Graph + AI Challenge International Hackathon, competing against 533 global teams with my project, DevDocs—an AI-driven platform providing real-time answers from company documentation to streamline developer workflows. Additionally, I received the People's Choice Award at the NASA Space Apps Challenge for developing an AI-powered platform inspired by the James Webb Space Telescope to create personalized space exploration videos. I was also a finalist in the Smart India Hackathon, where I collaborated with a talented team to develop innovative solutions addressing real-world challenges.\\n\\nFor more details, please visit my portfolio at yashwanthkrishna.com. I'm eager to connect with fellow professionals and explore opportunities to make a meaningful impact through technology.\",\"location\":{\"country\":\"India\",\"short\":\"Hyderabad, Telangana\",\"city\":\"Hyderabad\",\"state\":\"Telangana\",\"default\":\"Hyderabad, Telangana, India\"},\"premium\":false,\"influencer\":false,\"treasury_media\":[],\"languages\":{\"primary_locale\":{\"country\":\"US\",\"language\":\"en\"},\"supported_locales\":[{\"country\":\"US\",\"language\":\"en\"}],\"profile_languages\":[]},\"industry\":\"Computer Software\",\"education\":[{\"date\":{\"start\":{\"month\":6,\"day\":null,\"year\":2024},\"end\":{\"month\":8,\"day\":null,\"year\":2024}},\"school\":{\"name\":\"buildspace\",\"logo\":\"https://media.licdn.com/dms/image/v2/C4D0BAQH4v0G7qtO5UQ/company-logo_400_400/company-logo_400_400/0/1668195915807/buildspaceso_logo?e=1764806400&v=beta&t=uHws4fdQUkpS9Zdvm5jc_dPozOlYiNR2GvLv7UHHETY\",\"url\":\"https://www.linkedin.com/school/buildspacee/\"},\"degree_name\":null,\"description\":null,\"field_of_study\":null,\"grade\":null},{\"date\":{\"start\":{\"month\":1,\"day\":null,\"year\":2022},\"end\":{\"month\":7,\"day\":null,\"year\":2026}},\"school\":{\"name\":\"Kakatiya Institute of Technology & Science, Yerragattu Hillocks, Bheemaram, Hasanparthy, Warangal\",\"logo\":\"https://media.licdn.com/dms/image/v2/C510BAQHeBoXaJ-XqXQ/company-logo_400_400/company-logo_400_400/0/1630585835539/kakatiya_institute_of_technology__science_yerragattu_hillocks_bheemaram_hasanparthy_warangal_logo?e=1764806400&v=beta&t=_KeXMlLMIoJsRNvNm3v9a38O1olvWdfYdHh9Dk2XB4Q\",\"url\":\"https://www.linkedin.com/school/kakatiya-institute-of-technology-and-science-hasanaparthy-warangal/\"},\"degree_name\":\"Bachelor of Technology - BTech\",\"description\":null,\"field_of_study\":\"Computer Science\",\"grade\":null}],\"patents\":[],\"awards\":[],\"certifications\":[{\"name\":\"Winner - IBM Granite Generative AI Hackathon\",\"date\":{\"start\":{\"month\":2,\"day\":null,\"year\":2025},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"authority\":\"lablab.ai\",\"url\":\"https://lablab.ai/u/@yashwanthkrishna/cm9sxh96k0030dl0sg4ys7u02\",\"license_number\":\"cm9sxh96k0030dl0sg4ys7u02\",\"display_source\":\"lablab.ai\",\"company\":{\"id\":null,\"name\":\"lablab.ai\",\"logo\":\"https://media.licdn.com/dms/image/v2/C560BAQE8Pc5tfJ5Hcg/company-logo_400_400/company-logo_400_400/0/1659531792328/deep_learning_labs_logo?e=1764806400&v=beta&t=WLLJa7g6M02m4TCNweKOp1J527NnRKC7Vs77HiegH_s\",\"url\":null}},{\"name\":\"2024 People's Choice Winner -  NASA Space Apps Challenge\",\"date\":{\"start\":{\"month\":10,\"day\":null,\"year\":2024},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"authority\":\"NASA - National Aeronautics and Space Administration\",\"url\":\"https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/teamone/?tab=details\",\"license_number\":null,\"display_source\":\"spaceappschallenge.org\",\"company\":{\"id\":null,\"name\":\"NASA - National Aeronautics and Space Administration\",\"logo\":\"https://media.licdn.com/dms/image/v2/C4D0BAQGRBHWCcaAqGg/company-logo_400_400/company-logo_400_400/0/1630507197379/nasa_logo?e=1764806400&v=beta&t=vXUdsbl5nM9bt8vYvNeJ9ji_hcgx5U7D5z32TTK1kkc\",\"url\":null}}],\"organizations\":[],\"projects\":[{\"title\":\"Text 2 Story\",\"date\":{\"start\":{\"month\":6,\"day\":null,\"year\":2024},\"end\":{\"month\":6,\"day\":null,\"year\":2024}},\"description\":\"My journey started with Text2Story, a project that turns textbook lessons into fun, personalized AI-generated video stories to make learning more engaging for children. It combines storytelling with educational content to create a unique and meaningful learning experience\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Symphony of the Stars- Nasa space apps challenge (2024 People's Choice Winner)\",\"date\":{\"start\":{\"month\":8,\"day\":null,\"year\":2024},\"end\":{\"month\":9,\"day\":null,\"year\":2024}},\"description\":\"We created an AI-powered platform that brings the awe-inspiring discoveries of the James Webb Space Telescope (JWST) directly to users by transforming scientific data into captivating multimedia stories. Our platform allows anyone to type in a query—such as \\\"Uranus\\\" or \\\"formation of galaxies\\\"—and instantly generate their own personalized video, uniquely tailored to their interests. Each video blends real JWST images, AI-generated visuals, engaging narration available in multiple global languages, and a background musical score designed to evoke a sense of cosmic wonder. The platform goes beyond a simple video generator.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Automation of Drill Core Rock Sample lithology Logging (SIH 2023 finale)\",\"date\":{\"start\":{\"month\":9,\"day\":null,\"year\":2023},\"end\":{\"month\":12,\"day\":null,\"year\":2023}},\"description\":\"This is our project at the smart India hackathon finale 2023.\\n\\nDeveloped an automated drill core rock sample lithology logging system using YOLO algorithm.\\n\\nTrained the system to identify and localize features like fractures and cracks in core images, improving efficiency and reducing manual workload.\\n\\nIntegrated the system with geological workflows, providing valuable data for rock characterization and decision-making.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Content-Hub\",\"date\":{\"start\":{\"month\":null,\"day\":null,\"year\":null},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"description\":\"Content Hub is an AI-powered platform designed to revolutionize social media content creation. With a focus on automation and personalization, this tool empowers users to generate high-quality, platform-specific posts for Twitter, Instagram, LinkedIn, and YouTube, alongside gameplay-based reels/shorts like Minecraft gta5 etc.. By leveraging cutting-edge AI technologies and a seamless user interface, Content Hub streamlines the process of crafting professional and engaging social media content.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]}],\"publications\":[],\"courses\":[],\"test_scores\":[],\"position_groups\":[{\"company\":{\"id\":100761834,\"name\":\"C-i2RE @ KITS Warangal\",\"logo\":\"https://media.licdn.com/dms/image/v2/D560BAQFgosseEcj6pA/company-logo_400_400/company-logo_400_400/0/1703670791178/i2re_kitsw_logo?e=1764806400&v=beta&t=h55XXIFj2Ybs2k0EyTp83cuyegcDWG_241Y4Cdu0Xbc\",\"url\":\"https://www.linkedin.com/company/kitsw-i2ref/\",\"employees\":{\"start\":2,\"end\":10}},\"date\":{\"start\":{\"month\":11,\"day\":null,\"year\":2023},\"end\":{\"month\":12,\"day\":null,\"year\":2024}},\"profile_positions\":[{\"location\":null,\"date\":{\"start\":{\"month\":7,\"day\":null,\"year\":2024},\"end\":{\"month\":12,\"day\":null,\"year\":2024}},\"company\":\"C-i2RE @ KITS Warangal\",\"description\":\"Taking PR training sessions for the student clubs and giving guidance over the outreach plans made by the clubs.\",\"title\":\"Public relation advisory \",\"employment_type\":\"Apprenticeship\"},{\"location\":\"Warangal, Telangana, India\",\"date\":{\"start\":{\"month\":11,\"day\":null,\"year\":2023},\"end\":{\"month\":6,\"day\":null,\"year\":2024}},\"company\":\"C-i2RE @ KITS Warangal\",\"description\":\"Public Relations Officer and president of public relations and outreach club of student alliance body(SAIL)in a startup incubator called C-i2re\\n\\nManaged Instagram page from zero, achieving 130K impressions and high engagement rates averaging 15k views per reel.\\n\\nLed design, video editing, and photography teams, producing compelling content for social media.\\n\\nConducted regular meetings to strategize and coordinate club initiatives for effective student outreach.\\n\\nDemonstrated proficiency in event planning, coordinating timelines, budgets, and vendor relationships.\",\"title\":\"Public Relations Officer\",\"employment_type\":\"Apprenticeship\"}]}],\"has_more_positions\":false,\"volunteer_experiences\":[],\"skills\":[\"AI Agents\",\"Artificial Intelligence (AI)\",\"Social Media Marketing\",\"Digital Marketing\",\"Poster Design\",\"Photography\",\"Event Planning\",\"Generative Art\",\"yolo\",\"Machine Learning\",\"Object Detection\",\"Video Editing\",\"Design\",\"Engineering\",\"Digital Marketing Channels\"],\"network_info\":null,\"related_profiles\":null,\"contact_info\":null,\"verifications_info\":null},\"run_id\":\"8883c0ba-4614-467d-9925-ab25435035f6\"}",
            "requestDetails": {
              "url": "https://makemycv-api-production.up.railway.app/linkedin-profile",
              "method": "POST",
              "body": {
                "user_input": "https://www.linkedin.com/in/pyashwanthkrishna/"
              }
            }
          }
        ]
      },
      "Get-X-Posts": {
        "execution_status": "COMPLETED",
        "execution_start_time": 1763374603739,
        "execution_time": 6674,
        "execution_index": 3,
        "execution_output": [
          {
            "serviceResponse": "{\"success\":true,\"tweets\":[{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":38},\"created_at\":\"2025-06-28T14:23:41.000Z\",\"edit_history_tweet_ids\":[\"1938966536380915868\"],\"id\":\"1938966536380915868\",\"text\":\"@buildclub_ @gala_labs @tanmay_jain_ thank you!\"},{\"public_metrics\":{\"retweet_count\":1,\"reply_count\":2,\"like_count\":7,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":324},\"created_at\":\"2025-06-28T01:51:09.000Z\",\"edit_history_tweet_ids\":[\"1938777156311732416\"],\"id\":\"1938777156311732416\",\"text\":\"this whole project was built on top of the existing MCP built by @gala_labs  and special thanks to @tanmay_jain_  and @buildclub_ .\\n\\nhere is the github repo : https://t.co/sh2kxdr45p\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":3,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":162},\"created_at\":\"2025-06-28T01:51:08.000Z\",\"edit_history_tweet_ids\":[\"1938777154147492247\"],\"id\":\"1938777154147492247\",\"text\":\"4. it learns your texting style with each person based on your conversation history and generates personalized messages to them, that sound exactly like you. https://t.co/7dh5BUYyR6\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":3,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":71},\"created_at\":\"2025-06-28T01:51:08.000Z\",\"edit_history_tweet_ids\":[\"1938777150204846563\"],\"id\":\"1938777150204846563\",\"text\":\"3. you can reach out to anyone easily by simply generating a genuine message based on their posts. https://t.co/L2qCbBaaAr\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":3,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":109},\"created_at\":\"2025-06-28T01:51:07.000Z\",\"edit_history_tweet_ids\":[\"1938777146379641335\"],\"id\":\"1938777146379641335\",\"text\":\"2. It checks all your messages and gives a quick summary. What’s spam, what’s worth replying to, and what’s not. https://t.co/Sw7W8OcYCv\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":3,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":104},\"created_at\":\"2025-06-28T01:51:06.000Z\",\"edit_history_tweet_ids\":[\"1938777142709625008\"],\"id\":\"1938777142709625008\",\"text\":\"1. When you’re looking for help, it finds the right person from your chats, so you know exactly who to message. https://t.co/CH64QubINv\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":7,\"quote_count\":0,\"bookmark_count\":6,\"impression_count\":326},\"created_at\":\"2025-06-28T01:51:05.000Z\",\"edit_history_tweet_ids\":[\"1938777138804707344\"],\"id\":\"1938777138804707344\",\"text\":\"I built a free Instagram MCP server that maintains your genuine voice\\n\\n- it sends out personalized cold dms and even replies to posts in your own style. \\n- it also flags which contact could be the best person to help solve a problem. \\n\\nand many more go try it now! https://t.co/sRXpToJyIl\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":21},\"created_at\":\"2025-05-27T19:57:02.000Z\",\"edit_history_tweet_ids\":[\"1927454014402068808\"],\"id\":\"1927454014402068808\",\"text\":\"@RafaOlivares77 right\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":26},\"created_at\":\"2025-05-01T18:42:15.000Z\",\"edit_history_tweet_ids\":[\"1918013110377693233\"],\"id\":\"1918013110377693233\",\"text\":\"@_farisagha it is open now can you check once.\\nthank you🫡\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":46},\"created_at\":\"2025-05-01T17:08:40.000Z\",\"edit_history_tweet_ids\":[\"1917989559222014171\"],\"id\":\"1917989559222014171\",\"text\":\"@_farisagha can you send me one\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":2,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":50},\"created_at\":\"2025-05-01T03:11:06.000Z\",\"edit_history_tweet_ids\":[\"1917778781655425150\"],\"id\":\"1917778781655425150\",\"text\":\"@create_xyz I want it.\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":22},\"created_at\":\"2025-04-12T08:06:43.000Z\",\"edit_history_tweet_ids\":[\"1910967804703932432\"],\"id\":\"1910967804703932432\",\"text\":\"@wordisbonz @FarzaTV editor\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":1,\"like_count\":10,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":568},\"created_at\":\"2025-02-09T14:52:01.000Z\",\"edit_history_tweet_ids\":[\"1888601755392372814\"],\"id\":\"1888601755392372814\",\"text\":\"won my first international hackathon!\\n\\nmade my parents proud in front of the whole clg faculty 🥹, @hypermodeinc hosted the hackathon, where we placed 1st among 533 teams globally. https://t.co/eiBTqCijGV\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":53},\"created_at\":\"2025-02-08T16:41:46.000Z\",\"edit_history_tweet_ids\":[\"1888266984846201285\"],\"id\":\"1888266984846201285\",\"text\":\"@ayushunleashed @ReelsAiPro congrats man!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":69},\"created_at\":\"2025-01-28T05:57:29.000Z\",\"edit_history_tweet_ids\":[\"1884118582512214230\"],\"id\":\"1884118582512214230\",\"text\":\"@akhil_manga @deepseek_ai 🙂‍↕️🙂‍↕️\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":42},\"created_at\":\"2024-12-12T03:50:56.000Z\",\"edit_history_tweet_ids\":[\"1867054503545147399\"],\"id\":\"1867054503545147399\",\"text\":\"@safwaankay 🖐️\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":210},\"created_at\":\"2024-07-28T03:52:13.000Z\",\"edit_history_tweet_ids\":[\"1817407689997357068\"],\"id\":\"1817407689997357068\",\"text\":\"thank you @_buildspace\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":9,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":268},\"created_at\":\"2024-07-22T17:12:33.000Z\",\"edit_history_tweet_ids\":[\"1815434774250729648\"],\"id\":\"1815434774250729648\",\"text\":\"we got many valuable insights on our ideas at @THubHyd \\n\\nmy idea text2story: a mother can record her voice once, and her child's stories will always be in her voice.\\n\\n#thub #startupindia https://t.co/wXdJVZANU2\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":5,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":173},\"created_at\":\"2024-07-12T00:03:15.000Z\",\"edit_history_tweet_ids\":[\"1811551860073119989\"],\"id\":\"1811551860073119989\",\"text\":\"@_buildspace @FarzaTV @_nightsweekends link: https://t.co/NbITo03fJb\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":57},\"created_at\":\"2024-07-08T21:02:03.000Z\",\"edit_history_tweet_ids\":[\"1810419097731035628\"],\"id\":\"1810419097731035628\",\"text\":\"@FarzaTV @_buildspace Hey Farza, Thank you so much!!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":45},\"created_at\":\"2024-07-08T20:27:59.000Z\",\"edit_history_tweet_ids\":[\"1810410525693751710\"],\"id\":\"1810410525693751710\",\"text\":\"@heyshazz @_buildspace @FarzaTV Thank youuuuu!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":6,\"like_count\":26,\"quote_count\":0,\"bookmark_count\":4,\"impression_count\":867},\"created_at\":\"2024-07-08T20:22:23.000Z\",\"edit_history_tweet_ids\":[\"1810409115925266762\"],\"id\":\"1810409115925266762\",\"text\":\"introducing text2story: \\n\\n • a mother can record her voice once, and her child's stories will always be in her voice\\n\\n  • provide a text and a voice sample, and our model generates videos with your voice narrating the stories\\n\\nDM for the waiting list!\\n\\ncc:@_buildspace @FarzaTV https://t.co/h8nNyrLVIX\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":46},\"created_at\":\"2024-07-04T15:20:13.000Z\",\"edit_history_tweet_ids\":[\"1808883520288534984\"],\"id\":\"1808883520288534984\",\"text\":\"@agibjames @_buildspace @FarzaTV @_nightsweekends https://t.co/QWr1AKcile\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":5,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":205},\"created_at\":\"2024-07-04T15:19:37.000Z\",\"edit_history_tweet_ids\":[\"1808883370186977598\"],\"id\":\"1808883370186977598\",\"text\":\"Stories ... Stories.... https://t.co/iXyZh8pXD2\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":32},\"created_at\":\"2024-07-03T15:24:52.000Z\",\"edit_history_tweet_ids\":[\"1808522304596455666\"],\"id\":\"1808522304596455666\",\"text\":\"@NileshArnaiya @_buildspace @_nightsweekends @FarzaTV Thanks man currently I am managing Collab with other accounts but if you have any idea of deploy ai agents or model please guide me it would be helpful full.\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":31},\"created_at\":\"2024-07-03T15:23:39.000Z\",\"edit_history_tweet_ids\":[\"1808521995920842865\"],\"id\":\"1808521995920842865\",\"text\":\"@Nafisamiriemami @_buildspace @_nightsweekends @FarzaTV UI looks cool and simple nice work!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":2,\"like_count\":12,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":286},\"created_at\":\"2024-07-03T13:20:13.000Z\",\"edit_history_tweet_ids\":[\"1808490935652642835\"],\"id\":\"1808490935652642835\",\"text\":\"Completed all of my free GPU in 5 of my Google collab accounts going hard on this one, just created another account to work on letss goo not stopping until launching the text2story.\\nCc:@_buildspace @_nightsweekends @FarzaTV https://t.co/eE9rdjFHhI\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":125},\"created_at\":\"2024-07-03T13:19:58.000Z\",\"edit_history_tweet_ids\":[\"1808490873111646628\"],\"id\":\"1808490873111646628\",\"text\":\"@FarzaTV check this out!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":15},\"created_at\":\"2024-07-02T16:02:53.000Z\",\"edit_history_tweet_ids\":[\"1808169480817893652\"],\"id\":\"1808169480817893652\",\"text\":\"@mike_ukachi yes, she did omg she loved it !\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":30},\"created_at\":\"2024-07-02T07:56:51.000Z\",\"edit_history_tweet_ids\":[\"1808047169834045594\"],\"id\":\"1808047169834045594\",\"text\":\"@_rebeccashres @_buildspace @_nightsweekends @FarzaTV It's awesome and don't self doubt ! \\nAll the bestt\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":33},\"created_at\":\"2024-07-02T07:55:54.000Z\",\"edit_history_tweet_ids\":[\"1808046930049880390\"],\"id\":\"1808046930049880390\",\"text\":\"@_rebeccashres @_buildspace @_nightsweekends Thankyouu!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":39},\"created_at\":\"2024-07-02T07:50:50.000Z\",\"edit_history_tweet_ids\":[\"1808045652267655310\"],\"id\":\"1808045652267655310\",\"text\":\"@pranlabs20 @_buildspace @_nightsweekends Thanks broo !\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":56},\"created_at\":\"2024-07-02T07:50:14.000Z\",\"edit_history_tweet_ids\":[\"1808045505047679370\"],\"id\":\"1808045505047679370\",\"text\":\"@pranshuj73 @_buildspace @_nightsweekends Awwwwwhhh thankyou means a lot :)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":44},\"created_at\":\"2024-07-02T07:48:11.000Z\",\"edit_history_tweet_ids\":[\"1808044989240562121\"],\"id\":\"1808044989240562121\",\"text\":\"@wordisbonz @_buildspace @_nightsweekends Hey Joshua!!!\\nLove the videos mannnn!\\nThank youuuu :)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":50},\"created_at\":\"2024-07-02T07:47:30.000Z\",\"edit_history_tweet_ids\":[\"1808044814254199209\"],\"id\":\"1808044814254199209\",\"text\":\"@talondragon000 @_buildspace @_nightsweekends Thankyouuu:)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":23},\"created_at\":\"2024-07-01T17:31:44.000Z\",\"edit_history_tweet_ids\":[\"1807829455605494235\"],\"id\":\"1807829455605494235\",\"text\":\"@heyshazz Goodjob :)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":44},\"created_at\":\"2024-07-01T17:31:24.000Z\",\"edit_history_tweet_ids\":[\"1807829369613963266\"],\"id\":\"1807829369613963266\",\"text\":\"@heyshazz @_buildspace @_nightsweekends cuteee\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":86},\"created_at\":\"2024-07-01T17:30:44.000Z\",\"edit_history_tweet_ids\":[\"1807829202160476298\"],\"id\":\"1807829202160476298\",\"text\":\"@subhashMkashyap @_buildspace @_nightsweekends thanks Andi\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":8,\"like_count\":87,\"quote_count\":1,\"bookmark_count\":4,\"impression_count\":3630},\"created_at\":\"2024-07-01T16:53:16.000Z\",\"edit_history_tweet_ids\":[\"1807819775453942201\"],\"id\":\"1807819775453942201\",\"text\":\"Captured this little one enjoying my first generated story.\\ncc: @_buildspace @_nightsweekends https://t.co/hFpg885c6G\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":5,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":35},\"created_at\":\"2024-06-29T14:28:03.000Z\",\"edit_history_tweet_ids\":[\"1807058455305293853\"],\"id\":\"1807058455305293853\",\"text\":\"@wordisbonz @_nightsweekends @_buildspace hope this counts!\\nhttps://t.co/sWeNZVEDlb\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":33},\"created_at\":\"2024-06-29T09:34:25.000Z\",\"edit_history_tweet_ids\":[\"1806984559298240648\"],\"id\":\"1806984559298240648\",\"text\":\"@subhashMkashyap @_nightsweekends @_buildspace Thank youu!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":32},\"created_at\":\"2024-06-29T07:05:05.000Z\",\"edit_history_tweet_ids\":[\"1806946975751065732\"],\"id\":\"1806946975751065732\",\"text\":\"@charmahander @_nightsweekends @_buildspace Thank youu !\\nGlad that you liked it hope I will lamch it soon :)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":33},\"created_at\":\"2024-06-29T07:04:24.000Z\",\"edit_history_tweet_ids\":[\"1806946806942880239\"],\"id\":\"1806946806942880239\",\"text\":\"@Nafisamiriemami @_nightsweekends @_buildspace Thakss!\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":37},\"created_at\":\"2024-06-28T15:08:23.000Z\",\"edit_history_tweet_ids\":[\"1806706217089212428\"],\"id\":\"1806706217089212428\",\"text\":\"@NileshArnaiya @_nightsweekends @_buildspace Thank youu🥹\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":39},\"created_at\":\"2024-06-28T14:48:31.000Z\",\"edit_history_tweet_ids\":[\"1806701217189359933\"],\"id\":\"1806701217189359933\",\"text\":\"@mayuresh_empire @_nightsweekends @_buildspace thanks:)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":1,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":13},\"created_at\":\"2024-06-28T14:39:41.000Z\",\"edit_history_tweet_ids\":[\"1806698991603601786\"],\"id\":\"1806698991603601786\",\"text\":\"@mast_ansh @_nightsweekends All the very best ansh who doesn't like to build their own personal brand. I would suggest that you be online in x(even tho I am not )and put something abt your wht are you learning e.t.c\\nBasically learning in public.\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":0,\"like_count\":0,\"quote_count\":0,\"bookmark_count\":0,\"impression_count\":17},\"created_at\":\"2024-06-28T14:37:22.000Z\",\"edit_history_tweet_ids\":[\"1806698412097814534\"],\"id\":\"1806698412097814534\",\"text\":\"@mast_ansh @_buildspace @_nightsweekends Thank you it means a lot :)\"},{\"public_metrics\":{\"retweet_count\":0,\"reply_count\":6,\"like_count\":24,\"quote_count\":1,\"bookmark_count\":2,\"impression_count\":703},\"created_at\":\"2024-06-28T14:36:41.000Z\",\"edit_history_tweet_ids\":[\"1806698240332488961\"],\"id\":\"1806698240332488961\",\"text\":\"toy version of text2stories.\\n\\na new way of telling stories.\\n\\n@_nightsweekends @_buildspace #ai #GenAI https://t.co/Camht3BX5u https://t.co/EayUF7paWR\"}],\"run_id\":\"f2926b44-7c87-4545-9752-d9e6811a88f1\",\"stats\":{\"total_fetched\":50,\"original_count\":48,\"retweets_filtered\":2}}",
            "requestDetails": {
              "url": "https://makemycv-api-production.up.railway.app/twitter-posts?max_wait=60&include_retweets=false",
              "method": "POST",
              "body": {
                "user_input": "yashwanthstwt"
              }
            }
          }
        ]
      },
      "Extract User Profile Details": {
        "execution_status": "COMPLETED",
        "execution_start_time": 1763374609764,
        "execution_time": 6618,
        "execution_index": 5,
        "execution_output": [
          {
            "user_profile_details": {
              "personal_info": {
                "first_name": "Yashwanth Krishna",
                "last_name": "Pavushetty",
                "date_of_birth": "",
                "gender": ""
              },
              "contact_info": {
                "email": "",
                "phone": "",
                "address": "Hyderabad, Telangana, India"
              },
              "education": [
                {
                  "degree": "",
                  "institution": "buildspace",
                  "start_date": "2024-06-01",
                  "end_date": "2024-08-01"
                },
                {
                  "degree": "Bachelor of Technology - BTech",
                  "institution": "Kakatiya Institute of Technology & Science, Yerragattu Hillocks, Bheemaram, Hasanparthy, Warangal",
                  "start_date": "2022-01-01",
                  "end_date": "2026-07-01"
                }
              ],
              "work_experience": [
                {
                  "job_title": "Public relation advisory",
                  "company": "C-i2RE @ KITS Warangal",
                  "start_date": "2024-07-01",
                  "end_date": "2024-12-01",
                  "description": "Taking PR training sessions for the student clubs and giving guidance over the outreach plans made by the clubs."
                },
                {
                  "job_title": "Public Relations Officer",
                  "company": "C-i2RE @ KITS Warangal",
                  "start_date": "2023-11-01",
                  "end_date": "2024-06-01",
                  "description": "Public Relations Officer and president of public relations and outreach club of student alliance body(SAIL)in a startup incubator called C-i2re\n\nManaged Instagram page from zero, achieving 130K impressions and high engagement rates averaging 15k views per reel.\n\nLed design, video editing, and photography teams, producing compelling content for social media.\n\nConducted regular meetings to strategize and coordinate club initiatives for effective student outreach.\n\nDemonstrated proficiency in event planning, coordinating timelines, budgets, and vendor relationships."
                }
              ],
              "skills": [
                "AI Agents",
                "Artificial Intelligence (AI)",
                "Social Media Marketing",
                "Digital Marketing",
                "Poster Design",
                "Photography",
                "Event Planning",
                "Generative Art",
                "yolo",
                "Machine Learning",
                "Object Detection",
                "Video Editing",
                "Design",
                "Engineering",
                "Digital Marketing Channels"
              ],
              "languages": [
                {
                  "language": "English",
                  "proficiency": ""
                }
              ]
            }
          },
          {
            "workflow_input_r7q9nfzjw": "{\"success\":true,\"profile\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":\"https://media.licdn.com/dms/image/v2/D5616AQHTRKPoFCTtVg/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1719645431211?e=1764806400&v=beta&t=fpYaoQNO5zDYt_3Mypsik6xiqtW29f4mBOQWIrx43ls\",\"profile_type\":\"personal\",\"open_to_work\":false,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"birth_date\":null,\"summary\":\"As a Generative AI Developer, I specialize in crafting innovative solutions that streamline workflows and enhance user experiences. My technical expertise includes developing AI agents, integrating various AI APIs such as OpenAI, ElevenLabs, and Llama, and utilizing Large Language Models (LLMs) to build intelligent applications. I have experience with Supabase for backend development, leveraging its real-time capabilities and seamless integration with Node.js. \\n\\nMy projects reflect a passion for harnessing AI's potential. For instance, Text2Story is an AI-driven platform that transforms textbook lessons into engaging animated videos, enhancing children's education. Content Hub automates social media content creation across major platforms, streamlining the process for users.\\nI have been recognized for my work in various competitions. I won the Grand Prize at the Hypermode Knowledge Graph + AI Challenge International Hackathon, competing against 533 global teams with my project, DevDocs—an AI-driven platform providing real-time answers from company documentation to streamline developer workflows. Additionally, I received the People's Choice Award at the NASA Space Apps Challenge for developing an AI-powered platform inspired by the James Webb Space Telescope to create personalized space exploration videos. I was also a finalist in the Smart India Hackathon, where I collaborated with a talented team to develop innovative solutions addressing real-world challenges.\\n\\nFor more details, please visit my portfolio at yashwanthkrishna.com. I'm eager to connect with fellow professionals and explore opportunities to make a meaningful impact through technology.\",\"location\":{\"country\":\"India\",\"short\":\"Hyderabad, Telangana\",\"city\":\"Hyderabad\",\"state\":\"Telangana\",\"default\":\"Hyderabad, Telangana, India\"},\"premium\":false,\"influencer\":false,\"treasury_media\":[],\"languages\":{\"primary_locale\":{\"country\":\"US\",\"language\":\"en\"},\"supported_locales\":[{\"country\":\"US\",\"language\":\"en\"}],\"profile_languages\":[]},\"industry\":\"Computer Software\",\"education\":[{\"date\":{\"start\":{\"month\":6,\"day\":null,\"year\":2024},\"end\":{\"month\":8,\"day\":null,\"year\":2024}},\"school\":{\"name\":\"buildspace\",\"logo\":\"https://media.licdn.com/dms/image/v2/C4D0BAQH4v0G7qtO5UQ/company-logo_400_400/company-logo_400_400/0/1668195915807/buildspaceso_logo?e=1764806400&v=beta&t=uHws4fdQUkpS9Zdvm5jc_dPozOlYiNR2GvLv7UHHETY\",\"url\":\"https://www.linkedin.com/school/buildspacee/\"},\"degree_name\":null,\"description\":null,\"field_of_study\":null,\"grade\":null},{\"date\":{\"start\":{\"month\":1,\"day\":null,\"year\":2022},\"end\":{\"month\":7,\"day\":null,\"year\":2026}},\"school\":{\"name\":\"Kakatiya Institute of Technology & Science, Yerragattu Hillocks, Bheemaram, Hasanparthy, Warangal\",\"logo\":\"https://media.licdn.com/dms/image/v2/C510BAQHeBoXaJ-XqXQ/company-logo_400_400/company-logo_400_400/0/1630585835539/kakatiya_institute_of_technology__science_yerragattu_hillocks_bheemaram_hasanparthy_warangal_logo?e=1764806400&v=beta&t=_KeXMlLMIoJsRNvNm3v9a38O1olvWdfYdHh9Dk2XB4Q\",\"url\":\"https://www.linkedin.com/school/kakatiya-institute-of-technology-and-science-hasanaparthy-warangal/\"},\"degree_name\":\"Bachelor of Technology - BTech\",\"description\":null,\"field_of_study\":\"Computer Science\",\"grade\":null}],\"patents\":[],\"awards\":[],\"certifications\":[{\"name\":\"Winner - IBM Granite Generative AI Hackathon\",\"date\":{\"start\":{\"month\":2,\"day\":null,\"year\":2025},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"authority\":\"lablab.ai\",\"url\":\"https://lablab.ai/u/@yashwanthkrishna/cm9sxh96k0030dl0sg4ys7u02\",\"license_number\":\"cm9sxh96k0030dl0sg4ys7u02\",\"display_source\":\"lablab.ai\",\"company\":{\"id\":null,\"name\":\"lablab.ai\",\"logo\":\"https://media.licdn.com/dms/image/v2/C560BAQE8Pc5tfJ5Hcg/company-logo_400_400/company-logo_400_400/0/1659531792328/deep_learning_labs_logo?e=1764806400&v=beta&t=WLLJa7g6M02m4TCNweKOp1J527NnRKC7Vs77HiegH_s\",\"url\":null}},{\"name\":\"2024 People's Choice Winner -  NASA Space Apps Challenge\",\"date\":{\"start\":{\"month\":10,\"day\":null,\"year\":2024},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"authority\":\"NASA - National Aeronautics and Space Administration\",\"url\":\"https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/teamone/?tab=details\",\"license_number\":null,\"display_source\":\"spaceappschallenge.org\",\"company\":{\"id\":null,\"name\":\"NASA - National Aeronautics and Space Administration\",\"logo\":\"https://media.licdn.com/dms/image/v2/C4D0BAQGRBHWCcaAqGg/company-logo_400_400/company-logo_400_400/0/1630507197379/nasa_logo?e=1764806400&v=beta&t=vXUdsbl5nM9bt8vYvNeJ9ji_hcgx5U7D5z32TTK1kkc\",\"url\":null}}],\"organizations\":[],\"projects\":[{\"title\":\"Text 2 Story\",\"date\":{\"start\":{\"month\":6,\"day\":null,\"year\":2024},\"end\":{\"month\":6,\"day\":null,\"year\":2024}},\"description\":\"My journey started with Text2Story, a project that turns textbook lessons into fun, personalized AI-generated video stories to make learning more engaging for children. It combines storytelling with educational content to create a unique and meaningful learning experience\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Symphony of the Stars- Nasa space apps challenge (2024 People's Choice Winner)\",\"date\":{\"start\":{\"month\":8,\"day\":null,\"year\":2024},\"end\":{\"month\":9,\"day\":null,\"year\":2024}},\"description\":\"We created an AI-powered platform that brings the awe-inspiring discoveries of the James Webb Space Telescope (JWST) directly to users by transforming scientific data into captivating multimedia stories. Our platform allows anyone to type in a query—such as \\\"Uranus\\\" or \\\"formation of galaxies\\\"—and instantly generate their own personalized video, uniquely tailored to their interests. Each video blends real JWST images, AI-generated visuals, engaging narration available in multiple global languages, and a background musical score designed to evoke a sense of cosmic wonder. The platform goes beyond a simple video generator.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Automation of Drill Core Rock Sample lithology Logging (SIH 2023 finale)\",\"date\":{\"start\":{\"month\":9,\"day\":null,\"year\":2023},\"end\":{\"month\":12,\"day\":null,\"year\":2023}},\"description\":\"This is our project at the smart India hackathon finale 2023.\\n\\nDeveloped an automated drill core rock sample lithology logging system using YOLO algorithm.\\n\\nTrained the system to identify and localize features like fractures and cracks in core images, improving efficiency and reducing manual workload.\\n\\nIntegrated the system with geological workflows, providing valuable data for rock characterization and decision-making.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]},{\"title\":\"Content-Hub\",\"date\":{\"start\":{\"month\":null,\"day\":null,\"year\":null},\"end\":{\"month\":null,\"day\":null,\"year\":null}},\"description\":\"Content Hub is an AI-powered platform designed to revolutionize social media content creation. With a focus on automation and personalization, this tool empowers users to generate high-quality, platform-specific posts for Twitter, Instagram, LinkedIn, and YouTube, alongside gameplay-based reels/shorts like Minecraft gta5 etc.. By leveraging cutting-edge AI technologies and a seamless user interface, Content Hub streamlines the process of crafting professional and engaging social media content.\",\"contributors\":[{\"type\":\"standardizedContributor\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"name\":null,\"headline\":\"Gen AI │ building text2story.\"}]}],\"publications\":[],\"courses\":[],\"test_scores\":[],\"position_groups\":[{\"company\":{\"id\":100761834,\"name\":\"C-i2RE @ KITS Warangal\",\"logo\":\"https://media.licdn.com/dms/image/v2/D560BAQFgosseEcj6pA/company-logo_400_400/company-logo_400_400/0/1703670791178/i2re_kitsw_logo?e=1764806400&v=beta&t=h55XXIFj2Ybs2k0EyTp83cuyegcDWG_241Y4Cdu0Xbc\",\"url\":\"https://www.linkedin.com/company/kitsw-i2ref/\",\"employees\":{\"start\":2,\"end\":10}},\"date\":{\"start\":{\"month\":11,\"day\":null,\"year\":2023},\"end\":{\"month\":12,\"day\":null,\"year\":2024}},\"profile_positions\":[{\"location\":null,\"date\":{\"start\":{\"month\":7,\"day\":null,\"year\":2024},\"end\":{\"month\":12,\"day\":null,\"year\":2024}},\"company\":\"C-i2RE @ KITS Warangal\",\"description\":\"Taking PR training sessions for the student clubs and giving guidance over the outreach plans made by the clubs.\",\"title\":\"Public relation advisory \",\"employment_type\":\"Apprenticeship\"},{\"location\":\"Warangal, Telangana, India\",\"date\":{\"start\":{\"month\":11,\"day\":null,\"year\":2023},\"end\":{\"month\":6,\"day\":null,\"year\":2024}},\"company\":\"C-i2RE @ KITS Warangal\",\"description\":\"Public Relations Officer and president of public relations and outreach club of student alliance body(SAIL)in a startup incubator called C-i2re\\n\\nManaged Instagram page from zero, achieving 130K impressions and high engagement rates averaging 15k views per reel.\\n\\nLed design, video editing, and photography teams, producing compelling content for social media.\\n\\nConducted regular meetings to strategize and coordinate club initiatives for effective student outreach.\\n\\nDemonstrated proficiency in event planning, coordinating timelines, budgets, and vendor relationships.\",\"title\":\"Public Relations Officer\",\"employment_type\":\"Apprenticeship\"}]}],\"has_more_positions\":false,\"volunteer_experiences\":[],\"skills\":[\"AI Agents\",\"Artificial Intelligence (AI)\",\"Social Media Marketing\",\"Digital Marketing\",\"Poster Design\",\"Photography\",\"Event Planning\",\"Generative Art\",\"yolo\",\"Machine Learning\",\"Object Detection\",\"Video Editing\",\"Design\",\"Engineering\",\"Digital Marketing Channels\"],\"network_info\":null,\"related_profiles\":null,\"contact_info\":null,\"verifications_info\":null},\"run_id\":\"8883c0ba-4614-467d-9925-ab25435035f6\"}"
          }
        ]
      },
      "Get-Linkedin-Posts": {
        "execution_status": "COMPLETED",
        "execution_start_time": 1763374603739,
        "execution_time": 19081,
        "execution_index": 2,
        "execution_output": [
          {
            "serviceResponse": "{\"success\":true,\"posts\":{\"pyashwanthkrishna\":{\"posts\":[{\"activity_id\":\"urn:li:ugcPost:7393269311634731008\",\"commentary\":\"This is what I’ve been working on for the past 30 days..\\n\\nThis is a live video where all conversations are happening in real-time with the Gemini Live API, answering farmer’s queries about crops and weather.\\n\\nKisan is a multi-agent AI assistant that helps farmers with crop diagnosis, weather insights, and scheme guidance through simple voice, text, and image interactions deployed with Google Cloud Run.\\n\\nThis is just a small part of what I’ve built. Check the comments to know more about Kisan.\",\"num_comments\":11,\"num_reactions\":74,\"reaction_breakdown\":{\"like\":69,\"praise\":3,\"empathy\":1,\"appreciation\":1},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_this-is-what-ive-been-working-on-for-the-activity-7393269614614409216-3yH4?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 week ago\",\"time_elapsed_utc\":\"1762692764195\",\"num_shares\":1,\"header_text\":null,\"attachments\":[{\"att_type\":\"video\",\"duration\":68666,\"thumbnail_url\":\"https://media.licdn.com/dms/image/v2/D5605AQEe77ohS7PoGg/videocover-high/B56Zporc03I8BU-/0/1762692817331?e=1763982000&v=beta&t=FWkpJzAlvlyRtfU6US0MOVCh46TAhUm4HJVjKKwfhxg\",\"streaming_url\":null}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:ugcPost:7341969766359711745\",\"commentary\":\"from reading The Hindu newspaper to learn english as a kid to getting featured in it. \\njust grateful.\\n\\n\\nfull article: https://lnkd.in/gHPNggwb\\n\\n.\\n.\\n\\nKITSW  Innovation Incubation Research and Entrepreneurship Foundation | FoundersLab | Rakesh Kumar Sahu | Dhruti S. Das\",\"num_comments\":28,\"num_reactions\":437,\"reaction_breakdown\":{\"like\":394,\"praise\":31,\"empathy\":8,\"appreciation\":4},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_the-hindu-article-activity-7342038557382889473-l0m5?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"5 months ago\",\"time_elapsed_utc\":\"1750461999502\",\"num_shares\":10,\"header_text\":null,\"attachments\":[{\"att_type\":\"document\",\"title\":\"the hindu article \",\"transcribed_url\":\"https://media.licdn.com/dms/document/media/v2/D561FAQG1Ei75r2AOqw/feedshare-document-sanitized-pdf/B56ZePpw9RGQBE-/0/1750461824775?e=1763982000&v=beta&t=dDijVILELO-bvlZhOIu32pJB41Z5J-Ds-1y8R6hmz2c\",\"manifest_url\":\"https://media.licdn.com/dms/document/pl/v2/D561FAQG1Ei75r2AOqw/feedshare-document-master-manifest/B56ZePpw9RGQBk-/0/1750461827281?e=1763982000&v=beta&t=PjqbciMPnB8aGNRZ-QIT2Yfurq1MIsRCjxP1X7tsK7E\",\"pages\":[{\"width\":347,\"height\":491,\"urls\":[\"[Max depth exceeded]\",\"[Max depth exceeded]\"]},{\"width\":578,\"height\":818,\"urls\":[\"[Max depth exceeded]\",\"[Max depth exceeded]\"]},{\"width\":909,\"height\":1286,\"urls\":[\"[Max depth exceeded]\",\"[Max depth exceeded]\"]},{\"width\":1372,\"height\":1940,\"urls\":[\"[Max depth exceeded]\",\"[Max depth exceeded]\"]}]}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:activity:7275812198688464896\",\"commentary\":\"An inspiring experience at T-Works where we shared our NASA Space Apps project and connected with visionary leaders. Grateful for the encouragement and support!\\n\\n#nasa #nasaspaceappschallenge #tworks #thub\",\"num_comments\":4,\"num_reactions\":57,\"reaction_breakdown\":{\"like\":54,\"empathy\":2,\"praise\":1},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_nasa-nasaspaceappschallenge-tworks-activity-7275812198688464896-rcxl?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"11 months ago\",\"time_elapsed_utc\":\"1734688806221\",\"num_shares\":0,\"header_text\":null,\"attachments\":[{\"att_type\":\"image\",\"image_urls\":[\"https://media.licdn.com/dms/image/v2/D5622AQFPP1XmvZowGw/feedshare-shrink_1280/B56ZPiIpoTG4Ao-/0/1734665739557?e=1764806400&v=beta&t=A3Fe59gKNgsRnSnMuPPbItFXA53eWtBaYXyUAaDwKpE\"]}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:activity:7272196005247250433\",\"commentary\":\"our team has been selected AS A 2024 NASA SPACE APPS CHALLENGE PEOPLE'S CHOICE AWARD HONOREE.\\n\\nThis journey has been an incredible experience, and we’re proud to be part of a global community pushing the boundaries of innovation and creativity.\\n\\nThank you, C-i2RE @ KITS Warangal and the NASA space Apps team, for giving us this opportunity.\\n\\n#nasa #nasaspaceappschallange #cu\",\"num_comments\":12,\"num_reactions\":67,\"reaction_breakdown\":{\"like\":62,\"empathy\":2,\"praise\":2,\"appreciation\":1},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_nasa-nasaspaceappschallange-cu-activity-7272196005247250433-bP-1?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1733826638519\",\"num_shares\":2,\"header_text\":null,\"attachments\":[{\"att_type\":\"image\",\"image_urls\":[\"https://media.licdn.com/dms/image/v2/D5622AQH6gPjDmKwH-A/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1733826637948?e=1764806400&v=beta&t=7Snilh7sCsAS8MPboRaEgFr_4SCnTtKF22TLTS09IWk\"]}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:ugcPost:7263023031940259841\",\"commentary\":\"🌟 Inspiring Student Interaction! 🌟\\nA dynamic interaction session was held with some of our brightest student innovators, exploring their ideas in depth and providing valuable insights. Dr. Raja Narendra Reddy, Head of C-i2RE @ KITS Warangal, also addressed the students, sharing words of encouragement and assuring them of guidance in their journey ahead. ✨\\nWe’re excited to see these innovative ideas come to life! 🚀\\n\\nAll India Council for Technical Education (AICTE) || Atal Innovation Mission Official || Kakatiya Institute of Technology & Science, Yerragattu Hillocks, Bheemaram, Hasanparthy, Warangal || Invest India || Ashoka Reddy Komalla || Sakuntala Kasaragadda  (PhD) || Sathya Peddapally || Dhruti S. Das || Rakesh Kumar Sahu || Akash Elakanti|| Student Alliance for innovation and Leadership (SAiL) ||\",\"num_comments\":0,\"num_reactions\":75,\"reaction_breakdown\":{\"like\":71,\"empathy\":4},\"li_url\":\"https://www.linkedin.com/posts/kitsw-i2ref_inspiring-student-interaction-a-dynamic-ugcPost-7263023031940259841-dXVc?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1731639631257\",\"num_shares\":6,\"header_text\":\"Yashwanth Krishna Pavushetty reposted this\",\"attachments\":[{\"att_type\":\"image\",\"image_urls\":[\"https://media.licdn.com/dms/image/v2/D5622AQGKC8dzGRBI0g/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731639623529?e=1764806400&v=beta&t=XrekRhWu0ftsJypwgpNLWBnBnzrPBPEbEZLVvTrH5vg\",\"https://media.licdn.com/dms/image/v2/D5622AQHZCACBiLMzYA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731639628279?e=1764806400&v=beta&t=fHuf11ylnnGHtcQV0nRAcQNSxmOk9PLRsDvdU1O1Uow\",\"https://media.licdn.com/dms/image/v2/D5622AQGxHfqATE_7Qw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731639628904?e=1764806400&v=beta&t=k_4yjRS-8D9qdYsg2zz9Y_agPqgKEVi287cJFhrxKoM\",\"https://media.licdn.com/dms/image/v2/D5622AQGpD_Q-sVQLRw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731639628948?e=1764806400&v=beta&t=AD6qELskLMSXNS_WgjkHHibWziH_Re4FUf9g18Eifo0\"]}],\"author\":{\"profile_type\":\"company\",\"name\":\"KITSW  Innovation Incubation Research and Entrepreneurship Foundation\",\"company_id\":100761834,\"universal_name\":\"kitsw-i2ref\",\"logo_url\":\"https://media.licdn.com/dms/image/v2/D560BAQFgosseEcj6pA/company-logo_400_400/company-logo_400_400/0/1703670791178/i2re_kitsw_logo?e=1764806400&v=beta&t=h55XXIFj2Ybs2k0EyTp83cuyegcDWG_241Y4Cdu0Xbc\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:ugcPost:7244934356614479872\",\"commentary\":\"selected for nationals of the NASA International Space Apps Challenge on 28th & 29th of september, at chandigarh university!\",\"num_comments\":9,\"num_reactions\":42,\"reaction_breakdown\":{\"like\":39,\"praise\":2,\"empathy\":1},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_selected-for-nationals-of-the-nasa-international-activity-7244934744352694274-GZJb?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1727326954988\",\"num_shares\":1,\"header_text\":null,\"attachments\":[{\"att_type\":\"video\",\"duration\":8400,\"thumbnail_url\":\"https://media.licdn.com/dms/image/v2/D5605AQG9AZTtWDpPiQ/videocover-high/videocover-high/0/1727327037387?e=1763982000&v=beta&t=PM8bQRLo6JzYpopuKk8fA7-saDDJr8dClH-arO6cVgQ\",\"streaming_url\":null}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:activity:7237823480598032384\",\"commentary\":\"My first-ever webinar on Generative AI at Amrita Chennai with 40+ students! \\n\\nCovered TEXT2STORY, GenAI models from Hugging Face, image generation models, and a live demo. \\n\\nOne down many more to go!\\n\\nThanks to Meghan Sai Chinthakuntla and IEEE Amrita Chennai for inviting me! \\n\\n#GenerativeAI #AI #Webinar #TEXT2STORY #AmritaChennai\",\"num_comments\":4,\"num_reactions\":47,\"reaction_breakdown\":{\"like\":43,\"praise\":2,\"empathy\":2},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_generativeai-ai-webinar-activity-7237823480598032384-GvXl?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1725631590032\",\"num_shares\":1,\"header_text\":null,\"attachments\":[{\"att_type\":\"image\",\"image_urls\":[\"https://media.licdn.com/dms/image/v2/D5622AQFCnMm3yi2W7A/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1725631589291?e=1764806400&v=beta&t=7BaVUrWlGK9PVQ_QJ4T0EY9AZKYtge7HZVaJUfmcbpI\"]}],\"author\":{\"profile_id\":\"pyashwanthkrishna\",\"first_name\":\"Yashwanth Krishna\",\"last_name\":\"Pavushetty\",\"sub_title\":\"Gen AI │ building text2story.\",\"profile_picture\":\"https://media.licdn.com/dms/image/v2/D5603AQE_R1XowAlCLQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1722139379116?e=1764806400&v=beta&t=om8Iw0KUpd0ULy2aOWT6UGN4bDeF0eE15N25rN5zE70\",\"background_image\":null,\"entity_urn\":\"ACoAAD8ZvasBZgmaVoXGF9CC7cgFnYxUaOczT7I\",\"object_urn\":1058651563,\"profile_type\":\"personal\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:activity:7232628813837320192\",\"commentary\":\"📢 Exciting Webinar Alert!📢\\n\\nThe IEEE Student Branch at Amrita Vishwa Vidyapeetham, Chennai Campus, invites you to an insightful webinar on:\\n\\n*The Development Journey of TEXT2STORY: A New Way of Telling Stories*  \\n🛠 A Gen-AI Project by P Yashwanth krishna \\n\\n🗓 *Date:* 24th August 2024  \\n🕔 *Time:* 5:00 PM  \\n💻 *Mode:* Virtual\\n\\n*Topics Covered:*\\n- Introduction to Generative AI\\n- Development Journey\\n- Key Features and Capabilities of TEXT2STORY\\n- Live Demonstration of the Project\\n- Q&A Session\\n\\n📍 *This is a limited-capacity event, so don't miss your chance to be part of it!*  \\n🔗 Register Here: (https://lnkd.in/gTVssZia)\\n\\nFollow us on Instagram for updates: @ieeesb_amritach\\n\\n---\\n\\nBe sure to register soon before spots fill up!\",\"num_comments\":0,\"num_reactions\":18,\"reaction_breakdown\":{\"like\":17,\"empathy\":1},\"li_url\":\"https://www.linkedin.com/posts/ieee-amrita-chennai_exciting-webinar-alert-the-ieee-student-activity-7232628813837320192-YS5s?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1724393084964\",\"num_shares\":1,\"header_text\":\"Yashwanth Krishna Pavushetty reposted this\",\"attachments\":[{\"att_type\":\"image\",\"image_urls\":[\"https://media.licdn.com/dms/image/v2/D5622AQHKZgkqYXzamQ/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1724393083827?e=1764806400&v=beta&t=5juZ6x7IKkVT6pp2f_EvtQcUyF2ok7FrSCApEZIdVTw\"]}],\"author\":{\"profile_type\":\"company\",\"name\":\"IEEE Amrita Chennai\",\"company_id\":97454629,\"universal_name\":\"ieee-amrita-chennai\",\"logo_url\":\"https://media.licdn.com/dms/image/v2/D560BAQEFeRhpt2XVYA/company-logo_400_400/company-logo_400_400/0/1701502531233?e=1764806400&v=beta&t=BJFxYOJBOesHOAebKDNat8Su50ShUrzZ85BBgIoVy-U\"},\"reshared_activity_details\":null},{\"activity_id\":\"urn:li:ugcPost:7226536308486127616\",\"commentary\":\"how i created my first ai model in just 42 days? ft.buildspace \\n\\n\\ntext2story is an innovative tool that transforms written stories and textbooks into engaging videos, complete with themes, voiceovers, and subtitles. it's designed to make learning and storytelling more fun and accessible.\\n\\nhey, this was me six weeks ago, just a regular person with an idea: i wanted to turn stories and textbooks into fun videos.                                                   \\n\\nwith zero knowledge in ai, i started my journey, working nights and weekends. week by week, i learned and implemented, building my first ai model.\\n\\ntwo weeks in, i had a basic toy model that could turn a simple prompt into a video. \\n\\nfour weeks in, i added various themes to make the videos more exciting and released a waitlist to gauge interest. \\n\\nthe response was amazing—people connected, inquired, and suggested improvements.\\n\\neach week brought new challenges, but i learned and improved, making my model better and smarter. \\n\\nnow, after six weeks, my model is ready with themes, voiceover options, and subtitles. i’m excited to launch the demo website!\\n\\ncheck it out and sign up for the waitlist now - https://lnkd.in/gdd3D8qv\",\"num_comments\":3,\"num_reactions\":81,\"reaction_breakdown\":{\"like\":75,\"praise\":3,\"empathy\":2,\"appreciation\":1},\"li_url\":\"https://www.linkedin.com/posts/pyashwanthkrishna_how-i-created-my-first-ai-model-in-just-42-activity-7226536317826822144-QIR7?utm_source=combined_share_message&utm_medium=member_ios&rcm=ACoAAGFCtBoB6mvn3daeQn2cAObnKttRGjuQYyc\",\"time_elapsed\":\"1 year ago\",\"time_elapsed_utc\":\"1722940518495\",\"num_shares\":0,\"header_text\":null,\"attachments\":[{\"att_type\":\"video\",\"duration\":95450,\"thumbnail_url\":\"https://media.licdn.com/dms/image/v2/D5605AQHZnT`}
                                        </pre>
                                    </div>
                                </details>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2 mt-6">1. Analyse Repos</h3>
                            <p className="mb-4 ml-4">
                                This process starts from the user&apos;s GitHub handle and:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Fetches selected public repositories and basic metadata.</li>
                                <li>Analyzes codebases and READMEs (via GitIngest).</li>
                                <li>Identifies tech stack, project purpose, and main contributions.</li>
                                <li>Produces structured project summaries and a list of relevant skills.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Its output forms the project and technical backbone of the CV.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">2. Get X Posts</h3>
                            <p className="mb-4 ml-4">
                                Given the user&apos;s X handle, this:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Fetches recent public posts.</li>
                                <li>Surfaces signals that reflect what the developer talks about and cares about professionally.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                This adds context and personality that can be reflected in the summary, projects, or skills.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">3. Get LinkedIn Posts</h3>
                            <p className="mb-4 ml-4">
                                From the user&apos;s LinkedIn activity, this:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Fetches recent public posts related to work, projects, and achievements.</li>
                                <li>Highlights launches, collaborations, side projects, or milestones mentioned in posts.</li>
                                <li>Provides extra material that can be woven into project descriptions or accomplishment bullets.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Together, Analyse Repos, Get X Posts, and Get LinkedIn Posts run simultaneously and then send all their outputs into a single consolidation workflow:
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">4. Project Repo CV Summarizer</h3>
                            <p className="mb-4 ml-4">
                                This Opus Agent takes the combined output of: Analyse Repos + Get X Posts + Get LinkedIn Posts and turns it into a CV-ready project and skills layer:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Selects the most relevant repositories to feature as projects.</li>
                                <li>Enriches them with context from X and LinkedIn posts where available.</li>
                                <li>Generates concise, resume-style project descriptions and bullet points.</li>
                                <li>Builds a consolidated skills map grouped for the CV (languages, frameworks, tools, etc.).</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">5. Get LinkedIn Profile Details</h3>
                            <p className="mb-4 ml-4">
                                In parallel to the above, this process focuses on the user&apos;s core professional profile:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Uses the LinkedIn profile URL to fetch public profile details.</li>
                                <li>Extracts job titles, companies, locations, date ranges, and short descriptions.</li>
                                <li>Collects education information and other key profile fields.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                Its output is a structured view of the user&apos;s experience and education.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">6. Extract User Profile Details</h3>
                            <p className="mb-4 ml-4">
                                This Opus Agent refines the raw profile data from Get LinkedIn Profile Details:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Cleans and normalizes titles, company names, and date formats.</li>
                                <li>Structures roles into a consistent, chronological experience list.</li>
                                <li>Prepares education and other profile details for direct insertion into the CV.</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                At this point, we have two major blocks:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Project & Skills block from Project Repo CV Summarizer</li>
                                <li>Profile & Experience block from Extract User Profile Details</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                These are then forwarded to the final assembly Agent.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">7. CV Final Output Generation</h3>
                            <p className="mb-4 ml-4">
                                The CV Final Output Generation Agent takes both blocks as input and:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Combines them into a complete CV draft.</li>
                                <li>Generates:
                                    <ul className="list-disc list-inside space-y-1 ml-8 mt-2">
                                        <li>A professional summary tailored to the job description.</li>
                                        <li>Grouped skills (languages, frameworks, tools, etc.).</li>
                                        <li>Work experience entries with bullet points.</li>
                                        <li>Project sections based on real repositories.</li>
                                        <li>Education and other relevant sections.</li>
                                    </ul>
                                </li>
                            </ul>
                            <p className="mb-4 ml-4">
                                It outputs a fully structured, machine-readable CV representation.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">8. Custom LaTeX Agent</h3>
                            <p className="mb-4 ml-4">
                                Finally, the structured CV from CV Final Output Generation is sent to a Custom Agent:
                            </p>
                            <p className="mb-4 ml-8">
                                This agent converts the CV content into LaTeX code that matches our single, standard developer resume template.
                            </p>
                            <p className="mb-4 ml-8">
                                The LaTeX output is then compiled by the backend into a PDF and returned to the user, with live editing support and re-compilation available in the UI.
                            </p>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center py-12 border-t border-zinc-200">
                            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Perfect CV?</h2>
                            <p className="mb-6">
                                Transform your scattered digital presence into a professional, ATS-optimized resume. 
                                Let AI handle the workflow from intake to delivery.
                            </p>
                            <Link 
                                href="/create-cv" 
                                className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-zinc-800 transition-colors"
                            >
                                Get Started Now →
                            </Link>
                            <p className="text-xs text-muted-foreground mt-4">
                                Built with{' '}
                                <Link href="https://opus.ai" className="text-red-500 hover:text-red-400 underline">
                                    Opus.ai
                                </Link>
                                {' '}•{' '}
                                <Link href="https://nextjs.org" className="text-red-500 hover:text-red-400 underline">
                                    Next.js
                                </Link>
                                {' '}•{' '}
                                <Link href="https://fastapi.tiangolo.com" className="text-red-500 hover:text-red-400 underline">
                                    FastAPI
                                </Link>
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </>
    )
}
