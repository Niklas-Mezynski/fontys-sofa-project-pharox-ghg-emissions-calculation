# ProjectPlan

Created by:
- Patrick van Leipsig
- Ramon Zalmai Masodi
- Niklas Mezynski
- Joel Sebastian Delgado

[//]: <> (Contents)
....

[//]: <> (Glossary and list of abbreviations)
@@include[Glossary.md](./Glossary.md)

[//]: <> (Introduction)
@@include[Introduction.md](./Introduction.md)

This document is meant to provide a project plan that will define the guidelines for the realization of a GHG-Emissions application for the company Pharox.

The following project will be developed for Pharox in the context of the module SoFa, offered during the semester 7 at Fontys University of Applied Sciences in Venlo.

Pharox gives all users the power of smart data in real time. The apps and intelligent software make it immediately clear where your products, assets or container is and what condition it is in. A wide variety of organizations make use of Pharox every day to optimize their business process. Pharox represents a shift from reaction and hindsight to instant awareness and prediction.

When it comes to product or process, you can now do much more than just hope for the best: you have the right to know that everything is working optimally regardless of the time, location, or supplier. Pharox's purpose is to provide process intelligence to professionals throughout the entire value chain, as they believe it's people that change the world, not things. (Pharox, 2023)

## 2.	Context

Pharox is active in optimization of supply chains by digitisation with different technologies, like IoT, Planningstool, RPA and AI. Their IT landscape is based on full cloud serverless environment, cloud functions and they use amongst others Google Firebase, React, Stencil, Flutter, NodeJS for their solutions.

## 3.	Problem

Pharox’ clients include big multinationals such as Walmart, Hema, and BASF. All these companies have the need to ship their goods. These shipments have a massive impact on GHG-Emissions like CO2. Transport contributes 14% to the emissions globally. 

In The Netherlands this share is 11%. There is an increased focus on monitoring and reducing these emission contributions, not only because of pressure from society but also from regulatory bodies such as the European Union. There are many standards which can be used to monitor and measure the emitted gasses, such as the ISO 14064 and the GLEC-Framework.

Pharox has a wide suite of applications which help these companies plan and optimize their supply chains. They wish to extend this by creating an application which helps companies to:

- Calculate the GHG emissions of road-, rail-, air- and ocean transport in the supply chain upfront.
- Monitor the GHG-Emissions of the execution.
- Provide management with information where there is room to reduce emissions.
The measuring of the emissions shall be done by the adoption of the GLEC-Framework in the application.

## 4. Assignment

The assignment for this project is to build an application, a modular solution (back-end and front-end) that helps Pharox’s clients to:
- Calculate the GHG emissions of road-, rail-, air- and ocean transport in the supply chain upfront.
- Monitor the GHG-emissions of the execution.
- Provide management info where there is room to reduce the emissions.
  
The app/modular solution should be integrated into the existing platforms like Smart Move, Smarti and Rail Easy or should feed our platforms. 

The modular solution should be based on the GLEC Framework (Global Logistics Emissions Council) industry standard, the ISO 14064 and the EU standard EN16258.

## 5. Activities

### 5.1 Analysis phase

- Grasp and define stakeholders’ details, concerns, and assignment requirements.
- Document information using user definitions, user stories, uses cases and scenarios.
- Study GLEC framework.
- Study and get familiar with Pharox’s environment which includes technology stack.
- Interviews with the stakeholders and identification of their concerns.

### 5.2 Design Phase

- Evaluate information acquired and come out with an idea to solve stakeholders’ concerns.
- Create needed artefacts to be able to explain the proposed solution, such as class diagram,
- sequence diagram, activity diagram and mock-ups.
- Define testing strategy and branching model.
- Interviews with stakeholders to gather feedback about proposed solution.

### 5.3 Implementation Phase

- Implementation of the proposed solution.
- Implementation testing.
- Acceptance testing.
- Interviews with stakeholders to assess the effectiveness of the solution.
- Provide code examples for evaluation of the implementation.

## 6. Scope

The scope of this project-plan is the realization and implementation of the MVP. The MVP consists out of and includes the following points:
- The backend of the application shall be created in Google Firebase
  o	Firebase Database
  o	Firebase Cloud Functions
	  Cloud Functions shall be modular in nature.
- GLEC-Framework calculations shall be converted to and implemented within Google Firebase Cloud Functions
  o	For the MVP you must be able to calculate emissions after the completion of a transport based on the GLEC-Framework
    •	The data necessary to calculate the emissions are already present in a database and we are not responsible for collecting the data           and/or the correctness.
- The Climatiq API shall be used to verify the calculations we make
-	It must be possible to calculate emissions for all type of transports listed below:
  o	Road
  o	Ocean
  o	Rail
  o	Air
-	The priority of the GLEC-Framework is “Scope 1”. Then this is completed for all types of transport detailed above then “Scope 2” and “Scope 3” shall be implemented
-	The MVP shall consist out of the backend only, so no UI.
-	A Front-End and other scopes/requirements shall be discussed once the MVP has been completed.

## 7. Requirements

The requirements of the project will be described in this document. There are 2 categories of requirements, these are functional and non-functional. The functional requirements are the ones that describe the functionality of the program, and the non-functional requirements are the ones that describe the technologies used performance requirements.

### 7.2 Functional Requirements

This section of the document will introduce the functional requirements (FR) of the program.

**FR1: Calculation of total emissions during transport**
The data about the emissions produced during transportation will be fetched from the database and based on the relevant information such as type of fuel, type of vehicle, distance, weight of the vehicle and other information. This data will be used to calculate the total amount of emissions produced during the trip.

**FR2: Displaying of the emissions data**
After the calculation is finished the result of this calculation should be displayed in the UI together with the input data which was used for the calculation.

**FR3: Calculation of expected emissions**
The information about the vehicle, fuel type, distance etc. will be used as input for a function that will calculate the expected emissions of the specified route that the vehicle used will produce. The data provided for this function will be the data recorded from previous trips with similar specifications or based on the data provided by the GLEC framework for all the different types of fuels or vehicles.

**FR4: Displaying of the expected emissions data**
After the calculation of expected emissions is finished, the result of this calculation should be displayed together with the input parameters that were used for the calculation.

### 7.3 Non-Functional Requirements

This section of the document will introduce the non-functional requirements (NFR) of the program.

**NFR1: Back-end**
The backend should be created with the use of Firebase cloud functions. These will be used to perform the calculations needed to get the proper data about emissions produced by transportation of goods

**NFR2: Front-end**
The front-end should be built using React/Flutter. The technology used will still be decided

**NFR3: Database**
The database used will be Firebase Realtime Database

**NFR4: Performance**
There are currently no performance requirements

## 8. Results

The desired product is a modular software solution aimed at calculating and managing greenhouse gas (GHG) emissions. The system shall be able to make precise calculations of these emissions using the Global Logistics Emissions Council (GLEC) framework. The primary focus will be on the calculation of Scope 1 emissions. Scope 1 describes all direct emissions that are owned by the company and produced by them in production steps or their own supply chain.

The core functionality is about the pure calculations of GHG emissions. This involves the implementation of cloud functions that expect required input data and perform the several calculation steps. They must be valid, reliable, and compliant with the guidelines and methods described in the GLEC framework.

To make the system flexible and easy to integrate into existing customer solutions, the system will be designed in a modular way. All calculation steps shall be separated into separate functions to make them testable as independent pieces. This also ensures that parts can easily be exchanged or adapted for integration with existing customer products. 

The accuracy and reliability of the calculations of GHG emissions is of high importance as customers rely on this system to create official emission reports. Therefore, the system validated within a detailed testing process. To validate results external, trusted APIs that already implement the framework can be used.

If the calculations are properly implemented for Scope 1, the system shall be extended with the calculations for Scope 2 and 3. This will enable customers to create full emission reports once they have all the necessary data available. 

### 8.1 Optional Extensions

Once the calculations are validated and approved, the cloud system may be integrated with existing data sources of Pharox’ customers. The existing system will be extended with more modular functions that allow reading and mapping data from different sources into a desired format so that the calculation steps can be applied.

Another feature may be the implementation of a graphical user interface or dashboard. It shall provide an interface for users to input data. The system must then calculate the emissions and display them in a proper way. Optionally, the system may suggest points of improvement where the user could save GHG emissions. There is a separate chapter in the GLEC framework covering this topic.

## 9. Organization

In the following chapter the methodologies and tools used to make this assignment possible will be described as well as the work environment.

### 9.1 Methodologies

The team will use the Agile Scrum methodology will be used as a project management method. Scrum is a way of to get work done, as a team, in small pieces at a time. The team consists of the Product Owner _Joris Tenhagen_, the Scrum Master _Patrick van Leipsig_ and the Developers. The Product Owner is responsible for ensuring the team is delivering the most valuable products while the Scrum Master helps the team to get organized effectively.

By using the Scrum methodology, the assignment will be broken into smaller pieces. Each of these pieces will be a functionality or user case, and they will be developed according to the 3 phases defined in chapter 5. This way, a functionality will be documented, developed, and tested, so the team will be then able to move into the next use case.

Sprints will be planned for a duration of 2 weeks. At the end of this period, the team will get together to hold the Sprint Review, where the Scrum Team and the key stakeholders review the work that has been done and give feedback. Followed by a Sprint Retrospective, where the Scrum Teams discuss how the last Sprint went and discuss ways to improve their effectiveness. Finally, the Sprint planning takes place to plan the upcoming Sprint.

Furthermore, there will be at least one weekly meeting with Pharox to discuss further questions that might arise while the development of the Sprint. This will be either Thursdays or Fridays at around 9:30, with preference for an online meeting via MS Teams. For informal communication or quick questions, the Slack channel provided by Pharox will be used. 

Atlassian Jira is used to manage the project and keep track of the progress. The backlog contains all the requirements and tasks that need to be done to complete the project. Also, it will be used to estimate the complexity of tasks, plan and track the different sprints, and assign tasks to the team members. The source code and other artifacts will be stored in the FontysVenlo GitHub repository.

### 9.2 Work Environment
...

## 10. Stakeholders
There are many different stakeholders within this project. This chapter will describe each of them and their interest.

**TODO: INSERT TABLE**

## 11. Planning

According to the SoFa’s workload, the team will be available for 20h/week during the duration of the semester 7 and academic holidays will be respected. Therefore, the team will be available from September to the end of December with the exceptions of weeks 42, 51 and 52.
For a more detailed planning see below table.

**TODO: Insert Table**

## 11. Risks

The above described project comes with certain risks. These are mentioned and evaluated in the following table 1. In order to define the risk level, the risk matrix in figure 1 has been used.

**TODO: RISKS**

## 13. Bibliography

from What is Artificial Intelligence?: https://www.techtarget.com/searchenterpriseai/definition/AI-Artificial-Intelligence#:~:text=Artificial%20intelligence%20is%20the%20simulation,speech%20recognition%20and%20machine%20vision.
CBS. (2023, September 12). Statistics Nederlands. Retrieved from Statistics Nederlands: https://www.cbs.nl/en-gb
Pharox. (2023, September 12). Pharox. Retrieved from Pharox: https://pharox.io/
Safety Culture. (2023, September 19). A Guide to Understanding 5x5 Risk Matrix. Retrieved from A Guide to Understanding 5x5 Risk Matrix: https://safetyculture.com/topics/risk-assessment/5x5-risk-matrix/
Smart Freight Centre. (2023, September 12). The GLEC Framework. Retrieved from The GLEC Framework: https://www.smartfreightcentre.org/en/our-programs/global-logistics-emissions-council/calculate-report-glec-framework/
UIPath. (2023, September 12). Robotic Process Automation. Retrieved from Robotic Process Automation: https://www.uipath.com/rpa/robotic-process-automation

