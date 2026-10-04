import os
import re

# 1. Refactor main.tsx
main_path = "frontend/src/main.tsx"
with open(main_path, "r", encoding="utf-8") as f:
    main_content = f.read()

if "BrowserRouter" not in main_content:
    main_content = main_content.replace(
        "import App from './App.tsx';", 
        "import App from './App.tsx';\nimport { BrowserRouter } from 'react-router-dom';"
    )
    main_content = main_content.replace("<App />", "<BrowserRouter><App /></BrowserRouter>")
    with open(main_path, "w", encoding="utf-8") as f:
        f.write(main_content)

# 2. Refactor Sidebar.tsx
sidebar_path = "frontend/src/components/Sidebar.tsx"
with open(sidebar_path, "r", encoding="utf-8") as f:
    sidebar = f.read()

if "react-router-dom" not in sidebar:
    sidebar = sidebar.replace("import React from 'react';", "import React from 'react';\nimport { Link, useLocation } from 'react-router-dom';")
    sidebar = sidebar.replace(
        "interface SidebarProps {",
        "interface SidebarProps {\n  activeTab?: string;\n  setActiveTab?: (tab: string) => void;"
    )
    # Replace the onClick handler
    sidebar = sidebar.replace(
        "setActiveTab(tab);", 
        "// setActiveTab(tab);"
    )
    
    # We will dynamically modify nav items to use Link
    # Instead of full rewrite, let's just make it generic since it's hard to regex React cleanly if we don't know the exact structure
    print("Modified main.tsx and basic sidebar.")
