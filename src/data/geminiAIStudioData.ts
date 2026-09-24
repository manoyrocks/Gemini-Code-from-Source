export interface AIStudioAppProject {
  id: string;
  name: string;
  targetPlatform: 'Web (Full-Stack React + Node)' | 'Android Mobile (Kotlin + Jetpack Compose)' | 'Android Tablet (Large Screen Adaptive Compose)';
  deviceType: 'web' | 'mobile' | 'tablet';
  description: string;
  architectureHighlight: string;
  userPrompt: string;
  geminiModel: string;
  technologies: string[];
  features: string[];
  emulatorPreview: {
    statusBadge: string;
    screenTitle: string;
    primaryMetrics: Record<string, string>;
    simulatedUI: {
      type: 'dashboard' | 'mobile-feed' | 'tablet-split';
      headerText: string;
      subText: string;
      items: {
        title: string;
        subtitle: string;
        tag: string;
        value?: string;
      }[];
    };
  };
  sourceTree: {
    filename: string;
    language: string;
    description: string;
    code: string;
  }[];
}

export const GEMINI_AI_STUDIO_CONTENT = {
  header: {
    title: "Gemini AI Studio: App Development",
    tagline: "Autonomous Full-Stack Web & Native Android Engineering from Natural Language Prompts",
    url: "https://aistudio.google.com/apps",
    description: "Google AI Studio Apps revolutionizes software creation by transforming plain-English briefs into production-grade Full-Stack Web applications (React + Express) and Native Android apps (Kotlin + Jetpack Compose) running in an in-browser cloud emulator or deployable to Google Play and Cloud Run.",
    metrics: [
      { label: "Target Runtimes", value: "Web SPA, Android Mobile, Android Tablet" },
      { label: "Android Stack", value: "Kotlin 2.0 + Jetpack Compose + Material 3" },
      { label: "Web Stack", value: "React 19 + TypeScript + Vite + Tailwind" },
      { label: "Cloud Backing", value: "Google Cloud Run + Firebase Firestore" }
    ]
  },

  coreCapabilities: [
    {
      id: "cap-natural-language-codegen",
      title: "Zero-Boilerplate Natural Language Generation",
      icon: "Sparkles",
      badge: "Prompt to Applet",
      summary: "Describe an entire product in natural language. Gemini designs the state machines, data schemas, API routes, and reactive UI components in one comprehensive turn.",
      techStack: "Gemini 2.5 / 3.x Flash & Pro code generation models with strict schema enforcement.",
      productionReadiness: "Generates clean, idiomatic code adhering to Google's Android Architecture Guidelines (MVVM/MVI, StateFlow, Coroutines) and modern React functional hooks."
    },
    {
      id: "cap-in-browser-emulator",
      title: "In-Browser Web & Native Android Emulation",
      icon: "Smartphone",
      badge: "Cloud Emulation",
      summary: "Test and interact with generated Android APKs and Web apps immediately in the browser without installing Android Studio, Gradle, or the 30GB Android SDK locally.",
      techStack: "Containerized WebAssembly and WebRTC Android virtual devices streaming 60fps viewports.",
      productionReadiness: "Simulates touch gestures, accelerometer, device rotation, foldables, and tablet multi-window splits."
    },
    {
      id: "cap-adaptive-layout-system",
      title: "Adaptive Tablet & Foldable Foundations",
      icon: "Tablet",
      badge: "Large Screens",
      summary: "Native support for Android WindowSizeClass (Compact, Medium, Expanded). Automatically adapts from single-pane mobile phone layouts to dual-pane tablet master-detail layouts.",
      techStack: "Jetpack Compose `calculateWindowSizeClass()`, NavigationSuiteScaffold, and SlidingPaneLayout.",
      productionReadiness: "Fully optimized for Google Pixel Fold, Pixel Tablet, Samsung Galaxy Tab, and Chromebooks."
    },
    {
      id: "cap-cloud-deployment",
      title: "One-Click Cloud Run & Google Play Export",
      icon: "Cloud",
      badge: "Production Delivery",
      summary: "Export production APKs/AABs ready for Google Play Internal Testing tracks, or deploy containerized web services directly to Google Cloud Run with custom domains.",
      techStack: "Google Cloud Artifact Registry, Google Play Developer Publishing API, Cloud Run serverless.",
      productionReadiness: "Includes Gradle signing configs, ProGuard / R8 minification rules, and Dockerfiles for zero-downtime container deploys."
    }
  ],

  projects: [
    {
      id: "proj-android-mobile-meds",
      name: "PulseRx - Mobile Medical Triage & Medication Companion",
      targetPlatform: "Android Mobile (Kotlin + Jetpack Compose)",
      deviceType: "mobile",
      description: "Native Android smartphone application utilizing on-device CameraX and Gemini Multimodal OCR to scan prescription pill bottles, calculate dose schedules, and alert for drug interactions with Material 3 Dynamic Color.",
      architectureHighlight: "Clean Architecture + MVVM + Jetpack Compose + StateFlow + Room DB + CameraX + Hilt DI",
      userPrompt: "Build an Android phone app in Kotlin & Jetpack Compose called PulseRx. Let users scan prescription labels with their camera, extract drug names and dosage instructions using Gemini vision, store reminders in Room database, and alert for dangerous food/drug interactions.",
      geminiModel: "Gemini 2.5 Flash (OCR & Multimodal Interaction Check)",
      technologies: ["Kotlin 2.0", "Jetpack Compose", "Material 3", "Room SQLite", "CameraX", "Coroutines Flow"],
      features: [
        "Real-time CameraX preview with optical bounding box overlay",
        "Gemini Vision prompt parsing medicine name, dosage, and frequency",
        "Room database with encrypted SQLCipher for HIPAA-compliant local storage",
        "Exact alarm scheduling via Android AlarmManager with heads-up notifications",
        "Material You Dynamic Color theming adapting to user wallpaper"
      ],
      emulatorPreview: {
        statusBadge: "Pixel 9 Pro · Android 15 (API 35)",
        screenTitle: "PulseRx Active Schedule",
        primaryMetrics: {
          "Daily Compliance": "100%",
          "Active Prescriptions": "3 medications",
          "Next Alarm": "8:00 PM (Metformin)"
        },
        simulatedUI: {
          type: "mobile-feed",
          headerText: "Today's Regimen",
          subText: "Wednesday, October 14 · All safety alerts cleared",
          items: [
            {
              title: "Atorvastatin 20mg",
              subtitle: "Take 1 tablet with evening meal · Cholesterol maintenance",
              tag: "Taken 8:15 AM",
              value: "✓ Done"
            },
            {
              title: "Metformin 500mg",
              subtitle: "Take 1 tablet with dinner · Avoid grapefruit juice",
              tag: "Due in 2h 45m",
              value: "8:00 PM"
            },
            {
              title: "Lisinopril 10mg",
              subtitle: "Blood pressure regulation · Take on empty stomach",
              tag: "Scheduled",
              value: "Tomorrow 7 AM"
            }
          ]
        }
      },
      sourceTree: [
        {
          filename: "app/src/main/java/com/pulserx/ui/MedicationScheduleScreen.kt",
          language: "kotlin",
          description: "Jetpack Compose UI rendering the schedule with Material 3 cards and swipe-to-complete gestures",
          code: `package com.pulserx.ui

import androidx.compose.animation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CameraAlt
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MedicationScheduleScreen(
    viewModel: MedicationViewModel,
    onNavigateToCameraScanner: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("PulseRx Schedule", style = MaterialTheme.typography.titleLarge) },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surfaceColorAtElevation(3.dp)
                )
            )
        },
        floatingActionButton = {
            ExtendedFloatingActionButton(
                onClick = onNavigateToCameraScanner,
                icon = { Icon(Icons.Default.CameraAlt, contentDescription = "Scan Label") },
                text = { Text("Scan Prescription") },
                containerColor = MaterialTheme.colorScheme.primaryContainer
            )
        }
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = 16.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            item {
                DailyComplianceHeader(
                    completedCount = uiState.completedToday,
                    totalCount = uiState.medications.size
                )
            }
            items(uiState.medications, key = { it.id }) { med ->
                MedicationCard(
                    medication = med,
                    onMarkTaken = { viewModel.markTaken(med.id) }
                )
            }
        }
    }
}`
        },
        {
          filename: "app/src/main/java/com/pulserx/data/GeminiLabelParser.kt",
          language: "kotlin",
          description: "Calls Gemini 2.5 Flash with structured schema to parse camera bitmap into prescription domain entities",
          code: `package com.pulserx.data

import android.graphics.Bitmap
import com.google.ai.client.generativeai.GenerativeModel
import com.google.ai.client.generativeai.type.content
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@Serializable
data class ParsedPrescription(
    val drugName: String,
    val dosageMg: Double,
    val frequencyPerDay: Int,
    val specialInstructions: String,
    val contraindications: List<String>
)

class GeminiLabelParser(private val geminiModel: GenerativeModel) {
    private val json = Json { ignoreUnknownKeys = true }

    suspend fun parseRxBitmap(labelBitmap: Bitmap): Result<ParsedPrescription> = runCatching {
        val prompt = content {
            image(labelBitmap)
            text("""
                Extract the prescription information from this medicine bottle image.
                Return ONLY valid JSON matching this schema:
                {
                  "drugName": "string",
                  "dosageMg": number,
                  "frequencyPerDay": number,
                  "specialInstructions": "string",
                  "contraindications": ["string"]
                }
            """.trimIndent())
        }

        val response = geminiModel.generateContent(prompt)
        val jsonText = response.text?.trim()?.removeSurrounding("\`\`\`json", "\`\`\`")?.trim()
            ?: error("Empty model output")

        json.decodeFromString<ParsedPrescription>(jsonText)
    }
}`
        }
      ]
    },
    {
      id: "proj-android-tablet-cockpit",
      name: "AeroFleet - Large Screen Tablet Dispatch Cockpit",
      targetPlatform: "Android Tablet (Large Screen Adaptive Compose)",
      deviceType: "tablet",
      description: "Adaptive Android tablet operations cockpit for commercial fleet logistics. Automatically renders a canonical dual-pane list-detail layout on Pixel Tablets and Samsung Galaxy Tab Ultra, with live sensor telemetry and route optimization.",
      architectureHighlight: "Canonical Tablet Layout + WindowSizeClass (Expanded) + ListDetailPaneScaffold + WebSockets + Maps V3",
      userPrompt: "Create an Android Tablet app for airport ground fleet dispatch called AeroFleet. Take full advantage of large screens (10-14 inch) with dual-pane layout: live vehicle roster and flight arrivals on the left, interactive route map and telematics telemetry on the right.",
      geminiModel: "Gemini 2.5 Pro (Multi-Vehicle Trajectory Optimization)",
      technologies: ["Kotlin 2.0", "Jetpack Compose Adaptive", "ListDetailPaneScaffold", "WindowSizeClass", "Google Maps Compose"],
      features: [
        "Dynamic layout adaptation using `calculateWindowSizeClass()`: single pane on foldables, dual-pane on tablet landscape",
        "Hardware keyboard shortcuts (J/K navigation, Space to assign, Ctrl+F search)",
        "Drag-and-drop vehicle dispatch reassignments across panes",
        "Sub-100ms vehicle telemetry streaming via Coroutines WebSockets",
        "Stylus and S-Pen annotatable flight apron map"
      ],
      emulatorPreview: {
        statusBadge: "Pixel Tablet · 2560x1600 · Landscape (Expanded)",
        screenTitle: "AeroFleet Ground Dispatch Cockpit",
        primaryMetrics: {
          "Active Apron Tug Vehicles": "28 Units",
          "On-Time Turnaround": "98.4%",
          "Pending Gate Requests": "3 flights"
        },
        simulatedUI: {
          type: "tablet-split",
          headerText: "Dual-Pane Adaptive Station (Left: Fleet Roster | Right: Gate Telematics)",
          subText: "WindowSizeClass: Width=EXPANDED, Height=MEDIUM",
          items: [
            {
              title: "Tug-104 (Heavy Pushback)",
              subtitle: "Assigned Gate B14 · Flight UA892 (B777-300ER)",
              tag: "In Motion (14 km/h)",
              value: "Gate B14"
            },
            {
              title: "BeltLoader-08",
              subtitle: "En route Gate C02 · Flight AA1402 (A321neo)",
              tag: "Battery 84%",
              value: "Gate C02"
            },
            {
              title: "Fueler-Unit-03",
              subtitle: "Pumping fuel at Gate D08 · 42,000 lbs transferred",
              tag: "Active Transfer",
              value: "Gate D08"
            }
          ]
        }
      },
      sourceTree: [
        {
          filename: "app/src/main/java/com/aerofleet/ui/AdaptiveDispatchLayout.kt",
          language: "kotlin",
          description: "Implements Jetpack Compose ListDetailPaneScaffold adapting between phone portrait and tablet dual-pane",
          code: `package com.aerofleet.ui

import androidx.compose.material3.adaptive.ExperimentalMaterial3AdaptiveApi
import androidx.compose.material3.adaptive.layout.ListDetailPaneScaffold
import androidx.compose.material3.adaptive.layout.ListDetailPaneScaffoldRole
import androidx.compose.material3.adaptive.navigation.rememberListDetailPaneScaffoldNavigator
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier

@OptIn(ExperimentalMaterial3AdaptiveApi::class)
@Composable
fun AdaptiveDispatchLayout(
    viewModel: DispatchViewModel,
    modifier: Modifier = Modifier
) {
    val navigator = rememberListDetailPaneScaffoldNavigator<String>()
    val uiState by viewModel.uiState.collectAsState()

    ListDetailPaneScaffold(
        directive = navigator.scaffoldDirective,
        value = navigator.scaffoldValue,
        listPane = {
            // Left Pane: Vehicle & Gate Queue
            FleetRosterPane(
                vehicles = uiState.vehicles,
                selectedId = uiState.selectedVehicleId,
                onSelectVehicle = { id ->
                    viewModel.selectVehicle(id)
                    navigator.navigateTo(ListDetailPaneScaffoldRole.Detail, id)
                }
            )
        },
        detailPane = {
            // Right Pane: Telematics & Live Apron Map
            uiState.selectedVehicle?.let { vehicle ->
                VehicleDetailTelemetryPane(
                    vehicle = vehicle,
                    onDispatchAction = { action -> viewModel.dispatch(vehicle.id, action) },
                    onClose = { navigator.navigateBack() }
                )
            } ?: EmptyDetailPlaceholder()
        },
        modifier = modifier
    )
}`
        }
      ]
    },
    {
      id: "proj-web-cloudrun-analytics",
      name: "QuantCloud - Full-Stack Financial AI Dashboard",
      targetPlatform: "Web (Full-Stack React + Node)",
      deviceType: "web",
      description: "Full-stack web application with React 19 frontend and Node.js Express server on Google Cloud Run. Integrates Gemini 2.5 Flash for continuous stock earnings call summarization and real-time sentiment extraction.",
      architectureHighlight: "React 19 + TypeScript + Vite + Tailwind CSS + Node.js Express + Gemini SDK + Cloud Run",
      userPrompt: "Build a high-performance financial analytics web app in React & TypeScript called QuantCloud. Include earnings call transcript analysis, sentiment heatmap, and server-side Gemini proxy to protect API keys.",
      geminiModel: "Gemini 2.5 Flash / Pro (Financial Sentiment Grounding)",
      technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Express.js", "Docker", "Google Cloud Run"],
      features: [
        "Vite Single Page Application with server-side proxy routes (/api/*)",
        "Streaming responses using Server-Sent Events (SSE) for instant generative rendering",
        "Responsive financial charts powered by SVG & Canvas without heavy dependencies",
        "Zero-client-key architecture: API keys stored securely in Google Cloud Secret Manager",
        "Multi-stage Dockerfile optimized for Google Cloud Run (sub-50MB production image)"
      ],
      emulatorPreview: {
        statusBadge: "Vite Dev Server (Port 3000) · Cloud Run Ready",
        screenTitle: "QuantCloud Market Intelligence",
        primaryMetrics: {
          "Q3 Ticker Scanned": "GOOGL, NVDA, AAPL",
          "Consensus Sentiment": "Strong Bullish (+0.82)",
          "Inference Latency": "220ms TTFT"
        },
        simulatedUI: {
          type: "dashboard",
          headerText: "Earnings Call Intelligence Stream",
          subText: "Live Gemini 2.5 Flash Sentiment Parser",
          items: [
            {
              title: "Alphabet Inc. (GOOGL)",
              subtitle: "Q3 Earnings Call · Cloud revenue growth up 35% YoY, TPU v5p acceleration",
              tag: "Bullish (0.91)",
              value: "$182.40 (+4.2%)"
            },
            {
              title: "NVIDIA Corp. (NVDA)",
              subtitle: "Blackwell chip volume production ramp on schedule across all hyperscalers",
              tag: "Bullish (0.95)",
              value: "$134.80 (+2.8%)"
            },
            {
              title: "Apple Inc. (AAPL)",
              subtitle: "Apple Intelligence rollout across 100M+ eligible iPhone devices in Q4",
              tag: "Neutral-Bullish (0.68)",
              value: "$231.10 (+0.4%)"
            }
          ]
        }
      },
      sourceTree: [
        {
          filename: "server.ts",
          language: "typescript",
          description: "Production Express server with Gemini SDK integration, proxying requests safely without exposing API keys to browser",
          code: `import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({});

app.post("/api/analyze-earnings", async (req, res) => {
  const { ticker, transcriptExcerpt } = req.body;
  if (!transcriptExcerpt) {
    return res.status(400).json({ error: "Missing transcriptExcerpt" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: \`Analyze the financial sentiment for ticker \${ticker}. 
Extract key revenue drivers, Capex guidance, and risks.
Transcript:
\${transcriptExcerpt}\`
            }
          ]
        }
      ],
      config: {
        temperature: 0.1,
        systemInstruction: "You are a senior quantitative financial analyst. Return factual bullet points."
      }
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`QuantCloud server running on port \${PORT}\`);
});`
        }
      ]
    }
  ]
};
