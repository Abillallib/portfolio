// Project data structure with dummy content
export const projectsData = {
  dataAnalysis: [
    {
      id: 'youtube-jamaica-analysis',
      title: 'YouTube Content Analysis: Jamaican Audience Insights',
      shortDescription: 'Building a data acquisition and classification pipeline for Jamaican YouTube content',
      category: 'Exploratory Data Analysis, Data Engineering, Data Science, Machine Learning',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Transformers', 'YouTube Data API v3', 'Google Colab'],
      image: `${import.meta.env.BASE_URL}images/projects/data projects/data-project5-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'In Progress',
      metrics: {
        videosAnalyzed: '901',
        classificationCriteria: '4+',
        customDataset: '1'
      },
      fullDescription: 'This Social Media Analytics project was initiated to answer a key market research question: What types of Jamaican-related content resonate most with audiences on YouTube? This analysis uses a data-driven approach to move beyond anecdotes and identify tangible patterns in content engagement. The project aims to analyze Jamaican-related content on YouTube to identify the categories, creators, and themes that resonate most with viewers, and to track how interest in Jamaican content has evolved over time.',
      challenges: 'The primary challenge was accurately identifying "Jamaican-related content." A simple filter on channel country was insufficient, as many major Jamaican creators list other countries.',
      solution: 'Developed a multi-layered heuristic model that analyzes channel country, creator nationality, and textual content (titles, descriptions, and transcriptions) to create a far more accurate and nuanced dataset than the API\'s metadata alone could provide.',
      results: 'Created a clean, classified dataset of 901 videos using a custom heuristic model, enabling nuanced analysis that was previously impossible. The project is now poised to deliver an interactive dashboard and machine learning model for automated content tagging.',
      keyTakeaways: 'This project has highlighted the critical need for custom logic to overcome the limitations of API metadata in niche classification tasks. The next steps include building an interactive dashboard for trend analysis and developing a formal classification model using Scikit-learn and Transformers to automate the content tagging process at scale.'
    },
    {
      id: 'sales-dashboard',
      title: 'Automated Revenue Assurance & Discount Alerting System',
      shortDescription: 'Designed an automated system using Power Automate to flag discount errors.',
      category: 'Automation, Business Intelligence, Data Engineering, Power BI, SQL',
      technologies: ['Power Automate', 'Power BI', 'SQL', 'Excel'],
      image: `${import.meta.env.BASE_URL}images/projects/data projects/data-project1-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed',
      metrics: {
        'Reduction in Errors': '>80%',
        'Revenue Saved': '$1M JMD',
        'Automation Level': '100%'
      },
      fullDescription: 'As the first hire for a new BI team, an initial analysis of sales data revealed significant revenue leakage due to manual errors in the discount application process, including erroneous 100% discounts. This project was initiated to create an automated system to provide real-time oversight and flag these errors, thereby preventing revenue loss and ensuring compliance with company discount policies.',
      challenges: 'The company\'s ERP system lacked validation for manually entered discounts, creating an environment where costly errors could occur without immediate detection. The challenge was to build a reliable, automated oversight system on top of this existing infrastructure without altering the core ERP.',
      solution: 'A multi-step, automated solution was engineered:\n\n1. Rule Codification: The official discount rules were first codified into a set of logic within an SQL database.\n\n2. Data Ingestion: The SQL data, along with recent sales data, was loaded into a Power BI model and configured with a data gateway for automatic refreshes of the last three days\' transactions.\n\n3. Automated Monitoring: A Power Automate flow was built to monitor the Power BI dataset for any new rows that violated the codified discount rules.\n\n4. Alerting & Logging: Upon detecting an error, the flow logs the transaction to an Excel file for tracking and sends an immediate email alert to the Sales and Customer Service managers for corrective action, ensuring no duplicate notifications are sent.',
      results: 'The implementation of this automated system provided immediate and significant business value. It has reduced discount application errors by over 80% and has directly saved over $1 million JMD in revenue since its inception. Beyond the quantifiable savings, the system brought unprecedented oversight and visibility to the sales process, fostering greater accountability and data integrity.',
      keyTakeaways: 'This project demonstrates the power of using a modern BI stack not just for analytics, but for active business process monitoring and improvement. It served as a key initiative that established the value of the new BI team by proactively identifying and solving a critical revenue leakage problem.'
    },
    {
      id: 'jse-stock-analysis',
      title: 'Automated Data Pipeline for JSE Stock Analysis',
      shortDescription: 'Automated ETL pipeline extracting and structuring stock data from daily PDF reports with inconsistent formats.',
      category: 'Data Engineering, Automation, Web Scraping, Python',
      technologies: ['Python', 'Selenium', 'Regular Expressions', 'Pandas', 'Excel Automation'],
      image: `${import.meta.env.BASE_URL}images/projects/data projects/data-project2-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed',
      metrics: {
        'Automation of Data Collection': '100%',
        'Stocks Tracked': '120+',
        'Data Points': '11'
      },
      fullDescription: 'For investors, timely analysis of Jamaica Stock Exchange (JSE) market reports is critical. However, this essential data is locked within hundreds of daily PDF documents with inconsistent formatting, making systematic, large-scale analysis a significant challenge. This project was initiated to solve this data accessibility problem by building a robust, end-to-end automated data pipeline that programmatically collects, parses, and structures this data for daily analysis.',
      challenges: 'The primary challenge was the lack of a consistent structure across the daily PDF reports. Key data fields were often in different locations or formatted differently, meaning a fixed parsing script would consistently fail.',
      solution: 'The solution involved a two-step automated process:\n\n1) A Selenium script was developed to automate a web browser, which navigates the JSE\'s public portal, programmatically downloads the daily reports, and saves them locally for processing.\n\n2) A sophisticated Python script was created to overcome the formatting inconsistencies. This script leverages a deep implementation of Regular Expressions (Regex) to create flexible, adaptable patterns that can reliably locate and extract 11 key data points for over 120 stocks, regardless of the document\'s layout variations.',
      results: 'The result is a fully automated pipeline that has achieved 100% automation of the data collection and processing workflow. The system has successfully processed historical reports spanning six-month periods and continues to run daily without manual intervention. The pipeline\'s final output is a structured Excel file which is automatically refreshed. This file feeds directly into an analysis table containing strategic calculations, enabling the immediate identification of new investment opportunities.',
      keyTakeaways: 'This project highlighted the critical importance of robust data extraction techniques for unlocking value from unstructured data sources. It was a practical exercise in building a resilient, end-to-end data engineering solution that creates tangible daily value.'
    },
    {
      id: 'student-survey-analysis',
      title: 'Student Exit Survey Sentiment Analysis',
      shortDescription: 'Sentiment Analysis of student exit surveys using NLP models, delivering an interactive Power BI dashboard.',
      category: 'Data Science, Sentiment Analysis, NLP, Machine Learning, Power BI',
      technologies: ['Python', 'SQL (Oracle)', 'Power BI', 'Excel', 'RoBERTa', 'VADER', 'text2emotion', 'NRCLex'],
      image: `${import.meta.env.BASE_URL}images/projects/data projects/data-project3-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed',
      metrics: {
        'Surveys Analyzed': '5,000+',
        'Key Areas Identified': '5',
        'NLP Models Compared': '4'
      },
      fullDescription: 'As part of an on-campus internship, this project was initiated to gain a deeper, qualitative understanding of the student experience from 5,000 exit surveys spanning cohorts from 2014 to 2025. The goal was to use Natural Language Processing (NLP) to analyze student feedback, identify key themes, and extract actionable insights to drive meaningful institutional improvement.',
      challenges: 'The project involved two primary challenges: ensuring data integrity during extraction and selecting the most effective models for analysis.\n\nData Integrity: During the initial SQL pull from the Oracle database, text comments containing newline characters (CHAR(10), CHAR(13)) were incorrectly splitting single responses into multiple rows, corrupting the dataset.\n\nModel Selection: A comparative analysis was needed to identify the most effective NLP models for both sentiment analysis and emotion detection from the survey responses.',
      solution: '1. Data Integrity: Resolved the text corruption issue at the source by embedding a REPLACE function within the SQL query to programmatically remove newline characters, ensuring data integrity for all 5,000 responses.\n\n2. Model Selection: Performed a comparative analysis of multiple models:\n   - For sentiment analysis: Benchmarked transformer-based RoBERTa against VADER, with RoBERTa demonstrating superior accuracy.\n   - For emotion detection: Compared text2emotion against NRCLex, selecting text2emotion for its better performance with the specific domain vocabulary.',
      results: 'The analysis successfully distilled feedback from over 4,500 students across more than a decade of cohorts. The primary impact was the identification and detailed analysis of five key areas requiring institutional attention: Housing, Dining, Course-Related Issues, Campus Activities, and Advising. The interactive Power BI dashboards provided university stakeholders with a clear, data-driven tool to explore these themes, enabling them to make targeted improvements to programs and services.',
      keyTakeaways: 'This project was a practical exercise in the end-to-end data science lifecycle, from initial data cleaning in SQL to advanced model comparison and final delivery to non-technical stakeholders. It demonstrated the value of benchmarking multiple NLP models to find the best fit for a specific domain\'s unique vocabulary.'
    },
    // {
    //   id: 'supply-chain-optimization',
    //   title: 'Supply Chain Optimization',
    //   shortDescription: 'Data-driven analysis optimizing inventory levels and reducing operational costs by 18%.',
    //   category: 'Data Analysis',
    //   technologies: ['SQL', 'Tableau', 'Excel', 'Power BI'],
    //   image: `${import.meta.env.BASE_URL}images/projects/data projects/data-project4-preview.png`,
    //   demoUrl: '#',
    //   githubUrl: '#',
    //   featured: false,
    //   status: 'Ongoing',
    //   metrics: {
    //     'Cost Reduction': '18%',
    //     'Inventory Optimization': '25%',
    //     'Reporting Efficiency': '40%'
    //   },
    //   fullDescription: 'This project focused on analyzing and optimizing the supply chain operations to reduce costs and improve efficiency. By leveraging data analysis techniques, we identified key areas for improvement in inventory management and operational workflows.',
    //   challenges: 'The main challenge was dealing with incomplete and inconsistent data across multiple systems, which made it difficult to get a unified view of the supply chain.',
    //   solution: 'Developed a comprehensive data integration and cleaning pipeline that consolidated data from various sources, followed by advanced analytics to identify optimization opportunities.',
    //   keyTakeaways: 'This project demonstrated the significant impact of data-driven decision making in supply chain management, with tangible cost savings and efficiency improvements.'
    // },
  ],
  aiEngineering: [
    {
      id: 'chatbot-assistant',
      title: 'PentelligentAI: An AI-Powered Cybersecurity Platform Concept',
      shortDescription: 'Designed and prototyped a React-based UI for an AI penetration testing tool that uses RAG models to retrieve real-time threats and AI to recommend security patches.',
      category: 'Applied AI, Cybersecurity, UI/UX Design, Product Design',
      technologies: ['React', 'Retrieval-Augmented Generation (RAG)', 'AI Code Analysis', 'Simulation Models', 'UI/UX Design'],
      image: `${import.meta.env.BASE_URL}images/projects/ai projects/ai-project1-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Concept / Prototype',
      metrics: {
        'Core AI Features': '3',
        'Interactive Prototype': '1',
        'Target Region': '1 Focused'
      },
      fullDescription: 'Cyberattacks are a growing threat to Caribbean businesses, costing millions and eroding customer trust. Inspired by this regional challenge, this AI graduate class project explores the concept of PentelligentAI—an automated, intelligent penetration testing tool designed to be accessible and affordable for these businesses. The goal was to envision a platform that could level the playing field in cybersecurity for the local market.',
      challenges: 'The main challenge was to distill the complex, data-heavy domain of cybersecurity into a clean and actionable user interface. The prototype, built in React, was designed to demonstrate a user-friendly workflow powered by a sophisticated AI backend.',
      solution: 'The conceptual solution is a system built on two core AI models:\n\n1. Real-Time Threat Intelligence (RAG): The system is designed to use a Retrieval-Augmented Generation (RAG) model to continuously query global threat databases and retrieve the latest CVEs (Common Vulnerabilities and Exposures), viruses, and malware definitions in real-time.\n\n2. AI-Powered Simulation & Patching: A second AI model would then deconstruct how a new threat works, simulate a test based on its attack pattern against the user\'s system, and then generate and recommend the specific patch or configuration change needed to neutralize the vulnerability.',
      results: 'The primary result of this project is a high-fidelity prototype with a video demonstration showcasing the user flow from threat detection to patch recommendation. The demo effectively communicates the value of an AI-driven security platform, translating complex threat intelligence into an accessible and user-friendly tool.',
      keyTakeaways: 'This project was an exercise in product design and vision, exploring how advanced AI architectures like RAG can be packaged into a user-friendly solution to address a specific market need. It highlighted the importance of UI/UX in making complex technologies accessible and actionable for non-technical stakeholders.'
    },
    {
      id: 'image-classification',
      title: 'Automated LinkedIn Content Co-Pilot',
      shortDescription: 'Developed a personal "content co-pilot" using n8n to fully automate the LinkedIn posting workflow, from idea submission and AI-powered drafting to final publication.',
      category: 'Automation, Workflow Design, n8n, Generative AI',
      technologies: ['n8n (Low-Code Automation)', 'OpenAI GPT-3.5 (Text Generation)', 'OpenAI GPT-4 (Image Generation)', 'LinkedIn API'],
      image: `${import.meta.env.BASE_URL}images/projects/ai projects/ai-project2-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed',
      metrics: {
        'Automated Steps': '5',
        'Reduction in Manual Work': '90%',
        'AI Models Integrated': '2'
      },
      fullDescription: 'The manual logistics of consistently creating and publishing content on LinkedIn—from drafting and formatting to generating images and scheduling—can create significant creative friction. This project was initiated to solve that problem by building a fully automated "content co-pilot" to manage the entire workflow, allowing for a greater focus on high-level idea generation.',
      challenges: 'The main challenge was to design a workflow that successfully blended automation with essential human oversight. The goal was to remove tedious logistics without sacrificing final creative control over the content.',
      solution: 'A five-step workflow was designed and implemented in the low-code platform n8n:\n\n1. Trigger: A weekly trigger initiates the process and sends a reminder.\n2. Input: A rough draft or idea is submitted to the workflow.\n3. AI Enrichment: The text is sent to OpenAI\'s GPT-3.5 for polishing, while GPT-4 generates a relevant image to match the content.\n4. Human-in-the-Loop: The complete, AI-enhanced draft is sent back for a mandatory approval step, ensuring final quality and control.\n5. Deployment: Upon approval, the content is automatically published to LinkedIn via its API.',
      results: 'The result is a fully functional, automated content pipeline that handles the majority of the logistical tasks involved in posting to LinkedIn. This system has successfully reduced the manual friction associated with content creation, saving significant time and allowing for a more consistent and creative posting schedule. The post describing this very project was the first successful test of the automation.',
      keyTakeaways: 'This project was a practical exploration of how modern low-code automation platforms and generative AI can be combined to solve real-world productivity challenges. It underscored the importance of designing "human-in-the-loop" systems, where automation serves to augment human creativity rather than replace it.'
    },
    {
      id: 'recommendation-engine',
      title: 'Generative AI: Authentic Jamaican Voice Synthesis',
      shortDescription: 'Developed a sophisticated prompt engineering methodology in Google AI Studio to generate a professional and authentic Jamaican accent for text-to-speech.',
      category: 'Generative AI, Prompt Engineering, Text-to-Speech (TTS), Google AI',
      technologies: ['Google AI Studio (Gemini Models)', 'Advanced Prompt Engineering', 'Audio Editing & Processing'],
      image: `${import.meta.env.BASE_URL}images/projects/ai projects/ai-project3-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed / Proof-of-Concept',
      metrics: {
        'Unique Voice Model': '1',
        'Target Applications': '2+',
        'Perceived Authenticity': '95%'
      },
      fullDescription: 'Standard text-to-speech (TTS) models, while technically advanced, often fail to capture the nuance and authenticity of regional accents, sounding robotic and inauthentic. This project was initiated to solve this problem for the Jamaican market by developing a methodology to generate a professional, high-quality Jamaican voice using generative AI.',
      challenges: 'Initial experiments with standard text-to-speech tools resulted in robotic and lifeless outputs that failed to capture the genuine cadence and accent of a Jamaican speaker. The primary challenge was moving beyond default settings to achieve true vocal authenticity.',
      solution: 'The solution was a deep dive into Google AI Studio, focusing on advanced prompt engineering. This was not a single prompt, but an iterative methodology involving rigorous tuning, comparative analysis of audio outputs, and refinement of instructional commands given to the AI. This process of "directing" the model, rather than just using it, was the breakthrough that produced a consistently authentic and professional-sounding Jamaican voice.',
      results: 'The primary result is a proven methodology for generating a high-quality, authentic Jamaican AI voice. An immediate application was the successful automation of voice-overs for a personal YouTube channel.\n\nThe broader impact is a powerful business solution for Jamaican companies. By converting static training documents (PDFs, handbooks) into an engaging "internal podcast" series, this technology can significantly increase employee engagement and information retention. It creates a more accessible and culturally resonant learning experience that makes team members feel that the content was built for them.',
      keyTakeaways: 'This project demonstrates that the power of modern generative AI lies not just in the models themselves, but in the sophisticated prompt engineering required to direct them toward specific, high-quality outcomes. It serves as a proof-of-concept for how generative AI can be used to fill niche market needs and create more inclusive and effective communication tools.'
    },
    {
      id: 'fraud-detection',
      title: 'Generative AI: Text-to-Image Web Application',
      shortDescription: 'Developed and deployed a full-stack text-to-image generation tool from concept to a live application.',
      category: 'Generative AI, Web App, API Integration, Python Streamlit',
      technologies: ['Python', 'TogetherAI API', 'Streamlit', 'GitHub'],
      image: `${import.meta.env.BASE_URL}images/projects/ai projects/ai-project4-preview.png`,
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
      status: 'Completed',
      metrics: {
        'Live Web App Deployed': '1',
        'Full Dev Lifecycle Steps': '4',
        'Avg. Generation Time': '<5 sec'
      },
      fullDescription: 'This project was a hands-on implementation of the end-to-end development lifecycle for a modern AI application. The goal was to move beyond theory and build a fully functional, publicly accessible text-to-image generator, serving as a tool for rapid creative ideation and content creation. It represents a passion for turning a simple idea into a usable tool.',
      challenges: 'The primary challenge was to take a backend AI concept—interacting with a generative model API—and build a complete, user-friendly web application around it, managing the entire deployment process to make it publicly accessible.',
      solution: 'A four-step development process was followed:\n\n1. API Integration: Securely connected to the TogetherAI API to access a state-of-the-art text-to-image model.\n2. Backend Logic: The core functionality was written in Python, handling user text input, API requests, and processing the resulting image.\n3. Frontend & Deployment: Streamlit was used to rapidly develop and deploy an interactive and user-friendly web interface for the tool.\n4. Version Control: The entire codebase was managed on GitHub, enabling a clean deployment pipeline to the live web app.',
      results: 'The result is a fully deployed and functional web application that allows users to generate images from text prompts in real-time. This project was a foundational experience in the practical development lifecycle, solidifying an end-to-end, problem-solving mindset. The application serves as a successful proof-of-concept for how generative AI can be leveraged for rapid ideation and content creation.',
      keyTakeaways: 'This project was a deep dive into the practicalities of building and deploying a live AI service. It demonstrated the power of modern frameworks like Streamlit for rapid prototyping and the importance of understanding the complete development cycle, from managing API keys to launching a live URL.'
    }
  ]
};

export const getProjectById = (id) => {
  const allProjects = [...projectsData.dataAnalysis, ...projectsData.aiEngineering];
  return allProjects.find(project => project.id === id);
};

export const getProjectsByCategory = (category) => {
  return category === 'dataAnalysis' ? projectsData.dataAnalysis : projectsData.aiEngineering;
};
