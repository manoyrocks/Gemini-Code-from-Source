export interface SparkWorkflow {
  id: string;
  name: string;
  category: 'Workspace Autopilot' | 'Cross-App Synthesis' | 'Proactive Standing Directives' | 'Enterprise Connectors (MCP)';
  status: 'active' | 'scheduled' | 'running' | 'completed';
  executionCadence: string;
  trigger: string;
  workspaceApps: ('Gmail' | 'Drive' | 'Docs' | 'Sheets' | 'Slides' | 'Calendar' | 'Meet' | 'Chat')[];
  thirdPartyServices?: string[];
  description: string;
  directivePrompt: string;
  steps: {
    stepIndex: number;
    app: string;
    action: string;
    outputSummary: string;
    payload?: any;
  }[];
  securityAndDlp: {
    classification: 'Confidential Internal' | 'Enterprise Sensitive' | 'Public';
    auditableLogs: boolean;
    dataResidency: string;
    humanInTheLoopRequired: boolean;
  };
}

export interface SparkCapabilityTopic {
  id: string;
  title: string;
  icon: string;
  badge: string;
  summary: string;
  enterpriseValue: string;
  architecturalMechanism: string;
  sdkAndApiMapping: string;
}

export const GEMINI_SPARK_CONTENT = {
  header: {
    title: "Gemini Spark Work",
    tagline: "Autonomous Agentic Intelligence for Google Workspace & Enterprise Operations",
    url: "https://gemini.google.com/spark",
    description: "Gemini Spark transforms Google Workspace from interactive assistants to 24/7 persistent autonomous background agents. Spark executes multi-step objectives, harmonizes Docs, Sheets, Gmail, Meet, and Calendar, connects to MCP servers, and enforces zero-data-retention enterprise guardrails.",
    metrics: [
      { label: "Execution Model", value: "24/7 Persistent Cloud Workers" },
      { label: "Workspace Apps", value: "Gmail, Docs, Sheets, Slides, Calendar, Meet, Drive, Chat" },
      { label: "Connectors", value: "Native MCP + Enterprise REST APIs" },
      { label: "Security", value: "Enterprise DLP & Zero Human Review" }
    ]
  },

  capabilities: [
    {
      id: "spark-autonomous-execution",
      title: "24/7 Persistent Background Cloud Execution",
      icon: "Cpu",
      badge: "Autonomous Engine",
      summary: "Unlike conversational chatbots that terminate when you close the browser tab, Spark workflows run on dedicated Google Cloud serverless agent environments.",
      enterpriseValue: "Tasks proceed continuously even when employees are offline, traveling, or asleep.",
      architecturalMechanism: "Event-driven asynchronous orchestrator powered by Google Cloud Run & Pub/Sub task scheduling with persistent session state.",
      sdkAndApiMapping: "Google Workspace Events API + Google Cloud Tasks + Gemini Function Calling loop"
    },
    {
      id: "spark-workspace-intelligence",
      title: "Native Workspace Intelligence Graph",
      icon: "Layers",
      badge: "Cross-App Graph",
      summary: "Direct bi-directional semantic index across Drive folders, Gmail threads, Google Calendar availability, Google Meet transcripts, and Google Sheets models.",
      enterpriseValue: "Eliminates siloed data: an email thread can immediately update a budget spreadsheet, generate a client recap doc, and schedule follow-ups.",
      architecturalMechanism: "Vector embeddings over Google Drive files with real-time OAuth scopes and user permission inheritance.",
      sdkAndApiMapping: "Google Drive v3, Gmail API, Sheets v4, Docs v1, and Google Calendar v3 APIs via OAuth client Bearer tokens"
    },
    {
      id: "spark-standing-directives",
      title: "Proactive Standing Directives & Reusable Skills",
      icon: "Zap",
      badge: "Standing Directives",
      summary: "Define natural-language business rules like 'Every Monday at 8am, synthesize team sprint blocker updates from Chat & Gmail into our Exec Weekly Sheet'.",
      enterpriseValue: "Replaces manual administrative reporting loops with self-executing routines.",
      architecturalMechanism: "Cron-like declarative goal statements evaluated against continuous change streams.",
      sdkAndApiMapping: "System instructions + Event hooks + Scheduled agent invocations"
    },
    {
      id: "spark-mcp-connectors",
      title: "Enterprise MCP & Custom Agent Connectors",
      icon: "FolderGit2",
      badge: "Model Context Protocol",
      summary: "Extensible beyond Google tools through Model Context Protocol (MCP) servers and enterprise REST APIs (Salesforce, Jira, ServiceNow, Canva, GitHub).",
      enterpriseValue: "Unified enterprise agent: read Jira sprint tickets, cross-reference with Google Sheets, and update Salesforce pipeline in one flow.",
      architecturalMechanism: "JSON-RPC 2.0 client communicating over standard stdio or SSE endpoints with authenticated tool declarations.",
      sdkAndApiMapping: "@modelcontextprotocol/sdk + Gemini Tool Declarations (`tools: [{ functionDeclarations: [...] }]`)"
    },
    {
      id: "spark-enterprise-dlp",
      title: "Enterprise-Grade DLP & Zero Data Retention",
      icon: "ShieldCheck",
      badge: "Compliance & Security",
      summary: "Strict enterprise boundaries: customer data is never used to train Google baseline models, zero human review, and automatic DLP classification.",
      enterpriseValue: "Full compliance with HIPAA, SOC 2 Type II, ISO 27001, and GDPR enterprise requirements.",
      architecturalMechanism: "Customer-managed encryption keys (CMEK), VPC Service Controls, and ephemeral isolated compute enclaves.",
      sdkAndApiMapping: "Google Cloud DLP API + Cloud KMS + Workspace Access Transparency"
    }
  ],

  sampleWorkflows: [
    {
      id: "wf-quarterly-sales-sync",
      name: "Q3 Sales Pipeline & Enterprise Deal Sync",
      category: "Cross-App Synthesis",
      status: "completed",
      executionCadence: "Triggered upon Salesforce Webhook + Scheduled Friday 5:00 PM",
      trigger: "Inbound Email with tag #signed-deal + Weekly pipeline cadence",
      workspaceApps: ["Gmail", "Drive", "Docs", "Sheets", "Calendar"],
      thirdPartyServices: ["Salesforce CRM", "DocuSign MCP Server"],
      description: "Extracts signed MSA terms from Gmail attachments, updates regional pipeline metrics in Google Sheets, drafts an executive briefing Google Doc, and schedules an onboarding call on Google Calendar.",
      directivePrompt: "Audit inbound contracts in Gmail tagged #signed-deal. Parse contract values, payment milestones, and SLA terms. Update 'FY26_Enterprise_Revenue.xlsx' in Google Drive. Create a 'Client_Kickoff_Brief.gdoc' in the shared Drive folder and draft a 30-min onboarding meeting for the account team.",
      steps: [
        {
          stepIndex: 1,
          app: "Gmail",
          action: "Search & Fetch Attachment",
          outputSummary: "Detected new email from procurement@acme-corp.com with signed MSA 'ACME_Enterprise_Agreement_2026.pdf'. Contract value: $340,000 ARR.",
          payload: {
            contractARR: "$340,000",
            termMonths: 36,
            paymentSchedule: "Annual Upfront",
            seats: 450
          }
        },
        {
          stepIndex: 2,
          app: "Google Sheets",
          action: "Append Row & Recalculate Model",
          outputSummary: "Appended ACME Corp to sheet 'Q3 Closed Won Pipeline'. Recalculated quota attainment: North America Enterprise team now at 104.2% of target.",
          payload: {
            sheetId: "1pM9_FY26_Revenue_Model",
            range: "Pipeline!A142:H142",
            updatedFormulas: ["SUM(ARR_Col)", "AVG_Discount_Rate"]
          }
        },
        {
          stepIndex: 3,
          app: "Google Docs",
          action: "Synthesize Executive Kickoff Brief",
          outputSummary: "Generated 3-page Google Doc in Drive folder '/Enterprise Accounts/ACME Corp/' with SLA highlights, key stakeholders, and custom compliance terms.",
          payload: {
            docTitle: "ACME Corp - Strategic Client Kickoff Brief",
            sections: ["Executive Summary", "SLA & Security Guarantees", "Implementation Milestones"]
          }
        },
        {
          stepIndex: 4,
          app: "Google Calendar",
          action: "Find Availability & Draft Event",
          outputSummary: "Identified open slot for 5 internal stakeholders: Tuesday at 10:00 AM PST. Created Google Meet link and drafted calendar invite with Google Doc attached.",
          payload: {
            startTime: "2026-10-06T10:00:00-07:00",
            attendees: ["account-lead@enterprise.com", "solutions-arch@enterprise.com", "customer-success@enterprise.com"]
          }
        }
      ],
      securityAndDlp: {
        classification: "Enterprise Sensitive",
        auditableLogs: true,
        dataResidency: "us-central1 (Council Bluffs)",
        humanInTheLoopRequired: false
      }
    },
    {
      id: "wf-meeting-notes-action-items",
      name: "Autonomous Google Meet Synthesis & Jira Delegation",
      category: "Workspace Autopilot",
      status: "running",
      executionCadence: "Post-Meeting Trigger (via Google Meet Webhook)",
      trigger: "Meeting ended with recording in Drive",
      workspaceApps: ["Meet", "Docs", "Chat", "Drive"],
      thirdPartyServices: ["Jira Software MCP"],
      description: "Extracts Google Meet recording transcript, synthesizes architectural decisions, maps action items to engineers, posts a formatted digest in Google Chat, and automatically creates assigned Jira tickets via MCP.",
      directivePrompt: "When 'AI Core Architecture Sync' finishes recording in Google Drive, analyze the transcript. Highlight technical decisions, dissenting opinions, and consensus. File Jira tasks for any task assigned to an engineer with priority and estimate. Post summary to Space #ai-architecture.",
      steps: [
        {
          stepIndex: 1,
          app: "Google Meet",
          action: "Ingest Transcript & Multi-Speaker Audio",
          outputSummary: "Processed 45-minute transcript across 6 participants (Sarah, David, Elena, Marcus, Priya, Liam). Extracted 14 decisions.",
          payload: {
            durationMinutes: 45,
            participantsCount: 6,
            keyTopics: ["KV Cache TTL vs Memory Pressure", "gRPC streaming vs WebSockets", "MCP Auth"]
          }
        },
        {
          stepIndex: 2,
          app: "Google Docs",
          action: "Draft Architectural Decision Record (ADR)",
          outputSummary: "Created ADR-089 in Google Drive: 'Decision to adopt Server-Sent Events (SSE) for agent live output'.",
          payload: {
            adrNumber: "ADR-089",
            status: "Approved",
            authors: ["David K.", "Elena R."]
          }
        },
        {
          stepIndex: 3,
          app: "Jira (MCP)",
          action: "Create & Assign Sprint Tickets",
          outputSummary: "Created 3 tickets via Model Context Protocol: JIRA-4201 (assigned to Marcus), JIRA-4202 (assigned to Liam), JIRA-4203 (assigned to Priya).",
          payload: {
            ticketsCreated: [
              { key: "JIRA-4201", summary: "Implement SSE heartbeat on port 8080", assignee: "Marcus T." },
              { key: "JIRA-4202", summary: "Benchmark KV cache invalidation under 5k concurrent users", assignee: "Liam S." }
            ]
          }
        },
        {
          stepIndex: 4,
          app: "Google Chat",
          action: "Broadcast Interactive Card Digest",
          outputSummary: "Posted rich card into Google Chat room #ai-architecture with quick-links to Google Doc, Jira issues, and meeting replay.",
          payload: {
            chatSpace: "spaces/AAAABBBCCCC",
            cardType: "V2 Architectural Digest"
          }
        }
      ],
      securityAndDlp: {
        classification: "Confidential Internal",
        auditableLogs: true,
        dataResidency: "Multi-Region EU/US",
        humanInTheLoopRequired: true
      }
    },
    {
      id: "wf-regulatory-compliance-audit",
      name: "Continuous Security & Regulatory Compliance Scanner",
      category: "Proactive Standing Directives",
      status: "active",
      executionCadence: "Daily at 02:00 AM UTC",
      trigger: "Scheduled Cron Directive",
      workspaceApps: ["Drive", "Sheets", "Gmail"],
      thirdPartyServices: ["Google Cloud DLP Engine"],
      description: "Scans new public or externally shared Google Drive folders for accidental PII/PCI exposure, logs anomalies in a master Sheets ledger, and alerts security admins via Gmail.",
      directivePrompt: "Every morning at 02:00 AM UTC, audit all files modified in the past 24 hours with external sharing permissions. Check for unmasked SSNs, private API keys, or unredacted tax forms. If detected, revoke external share link and send an urgent alert to security-leads@enterprise.com.",
      steps: [
        {
          stepIndex: 1,
          app: "Google Drive",
          action: "Scan Modified External Files",
          outputSummary: "Audited 1,482 files modified in corporate Drive. Flagged 2 suspect spreadsheets in marketing folder shared with 'Anyone with the link'.",
          payload: {
            filesScanned: 1482,
            flaggedCount: 2
          }
        },
        {
          stepIndex: 2,
          app: "Google Cloud DLP",
          action: "Deep PII Inspection",
          outputSummary: "Detected 43 plaintext credit card numbers in sheet 'Q3_Affiliate_Payouts_Temp.xlsx'.",
          payload: {
            infoTypesMatched: ["CREDIT_CARD_NUMBER", "US_BANK_ROUTING_MICR"],
            likelihood: "VERY_LIKELY"
          }
        },
        {
          stepIndex: 3,
          app: "Google Drive",
          action: "Auto-Remediation & Link Revocation",
          outputSummary: "Instantly changed permission from public link to internal domain only. Restricted editor permissions.",
          payload: {
            remediation: "PERMISSION_DOWNGRADED_TO_DOMAIN"
          }
        },
        {
          stepIndex: 4,
          app: "Gmail",
          action: "Send Critical Incident Digest",
          outputSummary: "Dispatched encrypted security incident report to CISO and compliance team with audit trail ID #SEC-2026-9041.",
          payload: {
            recipients: ["security-leads@enterprise.com", "compliance-officer@enterprise.com"],
            incidentSeverity: "HIGH"
          }
        }
      ],
      securityAndDlp: {
        classification: "Enterprise Sensitive",
        auditableLogs: true,
        dataResidency: "us-central1",
        humanInTheLoopRequired: false
      }
    }
  ]
};
