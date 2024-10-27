# LlamaSphere-Frontend

This is the frontend app.


# DevMatch: Intelligent Talent Allocation - Frontend

**DevMatch** is an intelligent frontend application that matches developers with projects based on skills, experience, and industry relevance. This README provides an overview of the application's features, setup instructions, and key details regarding functionality and design.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [Application Usage](#application-usage)
7. [Algorithm Criteria and Scoring](#algorithm-criteria-and-scoring)
8. [Matching Explanation](#matching-explanation)
9. [Design and UI/UX Considerations](#design-and-uiux-considerations)

## Project Overview

The **DevMatch** frontend application allows both recruiters and developers to interact with a talent allocation system designed to optimize project assignments based on developer skills and job requirements. The app leverages advanced matching criteria to provide tailored recommendations, ensuring developers are paired with projects that best suit their qualifications.

### Purpose

The primary purpose of DevMatch is to:
- Enable developers to find the most relevant job matches.
- Allow recruiters to upload job descriptions, define matching criteria, and receive the top candidate recommendations.

## Features

### 1. Role-Based Interfaces
- **Developer Interface**: Allows developers to upload their CV, which the system analyzes to suggest the best-fitting job roles.
- **Recruiter Interface**: Enables recruiters to upload job descriptions, assign custom weights to technical skills, and retrieve a list of top-matching developers.

### 2. Matching Process
- **Top 5 Candidates**: Recruiters receive a table of the top 5 developers with a match score.
- **Best Job Match**: Developers can view the best matching job description for their profile.
- **Detailed Match Explanation**: The system provides explanations for each match, showing how the candidate's experience and skills align with project requirements.

### 3. Matching Criteria
The application uses a combination of three main criteria to generate match scores:
1. **Industry Knowledge** (10%)
2. **Predefined Technical Skills** (30%)
3. **Job Description Matching** (60%)

## Project Structure

The frontend project structure is as follows:

```
devmatch-frontend/
│
├── src/
│   ├── app/
│   │   ├── components/          # Shared components (e.g., JobForm, CVForm)
│   │   ├── pages/               # Main pages (e.g., DeveloperDashboard, RecruiterDashboard)
│   │   ├── services/            # API and utility services
│   │   ├── app-routing.module.ts
│   │   └── app.component.ts
│   ├── assets/                  # Static assets (images, icons, etc.)
│   ├── environments/            # Environment configurations
│   ├── styles.css               # Global styles
│   └── index.html
│
├── README.md
└── package.json
```

## Technologies Used

- **Framework**: Angular 12+
- **UI Library**: Angular Material
- **State Management**: NgRx (optional, for managing complex state)
- **Styling**: CSS (can be extended to SCSS if needed)

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd llama-sphere
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```
   The application will be available at `http://localhost:4200`.

## Application Usage

### Developer Flow

1. **Upload CV**: Developers can upload their CV in `.docx` format.
2. **Get Best Match**: The system returns the best-matching job description based on the CV content and displays a score for alignment.

### Recruiter Flow

1. **Enter or Upload Job Description**: Recruiters can either type a new job description or upload one in `.docx` or `.txt` format.
2. **Assign Matching Criteria**:
   - Select technical skills and qualifications.
   - Assign weights (0-100%) to each skill to emphasize its importance.
3. **Find Match**: The system displays the top 5 candidates with match scores, sorted in descending order.

## Algorithm Criteria and Scoring

The matching algorithm is built around three core criteria:

1. **Industry Knowledge** (10% Weight)
   - Analyzes prior industry experience based on keywords in the CV.
   - Scores based on relevance to the job's industry.

2. **Technical Skills and Qualifications** (30% Weight)
   - Scores based on the developer’s skills matching the weighted skills selected by the recruiter.

3. **Job Description Matching** (60% Weight)
   - Assesses overall alignment between the developer’s qualifications and the job description using text analysis.

### Score Calculation

The final score is calculated as follows:

```
Final Score = (Industry Knowledge Score * 0.10) + (Technical Skills Score * 0.30) + (Job Description Score * 0.60)
```

This scoring mechanism prioritizes the overall match between job requirements and developer qualifications.

## Matching Explanation

To help users understand why a particular match was recommended, the application includes detailed explanations for each match, showing:
- Relevant industry experience (if any).
- Key technical skills and how well they match the job requirements.
- The overall alignment between job description and developer expertise.

## Design and UI/UX Considerations

The DevMatch frontend design emphasizes simplicity and usability:
- **User-Friendly Interface**: Angular Material components ensure responsive layouts and a clean, professional look.
- **Match Score Clarity**: Match scores are prominently displayed to help recruiters quickly assess candidate suitability.
- **Real-Time Feedback**: Interactive elements, such as loading indicators and hover tooltips, provide feedback on actions like uploading or matching.
- **Intuitive Form Inputs**: For recruiters, weight sliders on skills make it easy to adjust importance levels without requiring manual input.
  
