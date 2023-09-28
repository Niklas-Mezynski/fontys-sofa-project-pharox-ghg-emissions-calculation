# ProjectPlan

Created by:
- Patrick van Leipsig
- Ramon Zalmai Masodi
- Niklas Mezynski
- Joel Sebastian Delgado

# 0. Glossary and abbreviations

|Term|Definition|
|:----|:----|
|AI|“Artificial intelligence is the simulation of human intelligence processes by machines, especially computer systems.” (Burns, Laskowski, & Tucci, 2023)|
|GHG|Greenhouse gasses such as CO2, CH4, …|
|GLEC framework|Global Logistics Emissions Council Framework. The global method for calculation and reporting of logistics emissions. (Smart Freight Centre, 2023)|
|GLEC Scope 1 emissions|Direct emissions from assets that are owned or controlled by the reporting company.|
|GLEC Scope 2 emissions|Indirect emissions from electricity, heat, and steam purchased by the reporting company.|
|GLEC Scope 3 emissions|Transportation emissions required to move goods from suppliers to the reporting company.|
|RPA|“Robotic process automation (RPA) is a software technology that makes it easy to build, deploy, and manage software robots that emulate humans’ actions.” (UIPath, 2023)|
|SoFa|Software Factory|

# 1. Introduction

This document is meant to provide a project plan that will define the guidelines for the realization of a GHG-Emissions application for the company Pharox.

The following project will be developed for Pharox in the context of the module SoFa, offered during the semester 7 at Fontys University of Applied Sciences in Venlo.

Pharox gives all users the power of smart data in real time. The apps and intelligent software make it immediately clear where your products, assets or container is and what condition it is in. A wide variety of organizations make use of Pharox every day to optimize their business process. Pharox represents a shift from reaction and hindsight to instant awareness and prediction.

“When it comes to product or process, you can now do much more than just hope for the best: you have the right to know that everything is working optimally regardless of the time, location, or supplier. Pharox's purpose is to provide process intelligence to professionals throughout the entire value chain, as they believe it's people that change the world, not things.” (Pharox, 2023)

Pharox is active in optimization of supply chains by digitisation with different technologies, like IoT, Planningstool, RPA and AI. Their IT landscape is based on full cloud serverless environment, cloud functions and they use amongst others Google Firebase, React, Stencil, Flutter, NodeJS for their solutions.

# 2. Problem

Pharox’ clients include big multinationals such as Walmart, Hema, and BASF. All these companies have the need to ship their goods. These shipments have a massive impact on GHG-Emissions like CO2. Transport contributes 14% to the emissions globally.  (CBS, 2023)

In The Netherlands this share is 11%. There is an increased focus on monitoring and reducing these emission contributions, not only because of pressure from society but also from regulatory bodies such as the European Union. There are many standards which can be used to monitor and measure the emitted gasses, such as the ISO 14064 and the GLEC-Framework.

Pharox has a wide suite of applications which help these companies plan and optimize their supply chains. They currently do not have an application which allows for this.

# 3. Assignment

The assignment for this project is to build a modular application within Google Firebase that helps Pharox’s clients to:

-	Calculate the GHG emissions of road-, rail-, air- and ocean transport in the supply chain upfront.
-	Monitor the GHG-emissions of the execution.
-	Provide management info where there is room to reduce the emissions.

The application should be integrated into the existing platforms like Smart Move, Smarti and Rail Easy or should feed our platforms. 

The modular solution should be based on the GLEC Framework industry standard.

# 4. Activities

### 4.1. Analysis Phase

-	Grasp and define stakeholders’ details, concerns, and assignment requirements.
-	Document information using user definitions, user stories, uses cases and scenarios.
-	Study GLEC framework.
-	Study and get familiar with Pharox’s environment which includes technology stack.
-	Interviews with the stakeholders and identification of their concerns.

### 4.2. Design Phase

-	Evaluate information acquired and come out with an idea to solve stakeholders’ concerns.
-	Create necessary artefacts to be able to explain the proposed solution.
-	Define testing strategy and branching model.
-	Interviews with stakeholders to gather feedback about proposed solution.

### 4.3. Implementation Phase

-	Implementation of the proposed solution.
-	Implementation testing.
-	Acceptance testing.
-	Interviews with stakeholders to assess the effectiveness of the solution.
-	Provide code examples for evaluation of the implementation.

# 5. Scope

The following items are in and out of scope for the project:

### 5.1. In Scope

- Research an appropriate solution according to the GLEC-Framework.
- Creation of several artefacts/ UML diagrams as well as documentation of the proposed solution.
- Deliver the MVPs designated by the Product Owner and stakeholders.
- Implement the proposed solution.
- Quality assessments of the implemented solution.
- Interviews with various stakeholders and integrate feedback in the given solution.

### 5.2. Out of Scope

- Collect, manage and fill the database
- Application and integration of other standards as the GLEC-Framework

# 6. Requirements
The requirements of the project will be described in this document. There are 2 categories of requirements, these are functional and non-functional. 
The functional requirements are the ones that describe the functionality of the program, and the non-functional requirements are the ones that describe the technologies used performance requirements. 

### 6.1. Functional requirements
This section of the document will introduce the functional requirements (FR) of the program. These will be separated into 3 categories (Must have, should have, and could have) 

<table>
  <tr>
    <th>ID</th>
    <td>FR1</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Road transportation emissions</td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculations of all the emissions produced by transportation on roads should be implemented</td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR2</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Maritime transportation emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculations of all the maritime emissions produced should be implemented </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR3</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Rail transportation emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Should have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculations of all the emissions produced by transportation on railways should be implemented</td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR4</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Air transportation emissions</td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Could have </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculations of all the emissions produced by air transportation should be implemented </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR5</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Scope 1 Emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculation of all emissions related to Scope 1 as defined in the GLEC framework must be implemented. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR6</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Scope 2 Emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculation of all emissions related to Scope 2 as defined in the GLEC framework must be implemented. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR7</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of Scope 3 Emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculation of all emissions related to Scope 3 as defined in the GLEC framework must be implemented. The implementation should be able to  </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR8</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Specify all possible sets of input data </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Must have</td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The calculations for each Scope must specify a set of minimum required data to make the calculation of emissions possible. Furthermore, it shall specify a set of optional data that will enhance the precision of the calculation. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR9</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculation of expected emissions </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Should have </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>This function will calculate the expected amount of emissions that will be produced during the transportation beforehand. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR10</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Displaying of emission data </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Could have </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>After the calculation is finished the result of this calculation should be displayed in the UI together with the input data which was used for the calculation. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>FR11</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Displaying of the expected emissions data  </td>
  </tr>
  <tr>
    <th>Priority</th>
    <td>Could have </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>After the calculation of expected emissions is finished, the result of this calculation should be displayed together with the input parameters that were used for the calculation.  </td>
  </tr>
</table>

## 6.2. Non-functional requirements
This section of the document will introduce the non-functional requirements (NFR) of the program. 

<table>
  <tr>
    <th>ID</th>
    <td>NFR1</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Back-end </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The backend should be created within a Firebase environment. It shall consist of a Firebase Database and Firebase cloud functions. Such functions shall be modular. </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>NFR2</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Database  </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The database will be a Firebase Realtime Database  </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>NFR3</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Firebase Plan   </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>We will require that the Firebase Project is upgraded to the Blaze (Paid) plan so we can leverage the full functionality of the Cloud Functions   </td>
  </tr>
</table>

<table>
  <tr>
    <th>ID</th>
    <td>NFR4</td>
  </tr>
  <tr>
    <th>Title</th>
    <td>Calculations validations   </td>
  </tr>
  <tr>
    <th>Description</th>
    <td>The Climatiq API can be used to compare and validate the outcome of the calculations obtained by using the implemented tool.  </td>
  </tr>
</table>

# 7. Results

The outcome of this project will be a modular software solution which calculates GHG emissions. The system will be based on the GLEC framework.

The core functionality is about the pure calculations of GHG emissions for all of the 3 GLEC Scopes. This involves the implementation of cloud functions that expect required input data and perform the several calculation steps. They must be valid, reliable, and compliant with the guidelines and methods described in the GLEC framework.

To make the system flexible and easy to integrate into existing customer solutions, the system will be designed in a modular way. All calculation steps shall be separated into separate functions to make them testable as independent pieces. This also ensures that parts can easily be exchanged or adapted for integration with existing customer products. 

The accuracy and reliability of the calculations of GHG emissions is of high importance as customers rely on this system to create official emission reports. Therefore, the system validated within a detailed testing process. To validate results external, trusted APIs that already implement the framework can be used.

If the calculations are properly implemented for GLEC Scope 1, the system shall be extended with the calculations for GLEC Scope 2 and 3. This will enable customers to create full emission reports once they have all the necessary data available.

The implemented solution will be delivered with all the proper documentation.

### 7.1 Optional Extensions

Once the calculations are validated and approved, the cloud system may be integrated with existing data sources of Pharox’ customers. The existing system will be extended with more modular functions that allow reading and mapping data from different sources into a desired format so that the calculation steps can be applied.

Another feature may be the implementation of a graphical user interface or dashboard. It shall provide an interface for users to input data. The system must then calculate the emissions and display them in a proper way. Optionally, the system may suggest points of improvement where the user could save GHG emissions. There is a separate chapter in the GLEC framework covering this topic.

# 8. Organization

In the following chapter the methodologies and tools used to make this assignment possible will be described as well as the work environment.

### 8.1 Methodologies

The team will use the Agile Scrum methodology will be used as a project management method. Scrum is a way of to get work done, as a team, in small pieces at a time. The team consists of the Product Owner Joris Tenhagen, the Scrum Master Patrick van Leipsig and the Developers. The Product Owner is responsible for ensuring the team is delivering the most valuable products while the Scrum Master helps the team to get organized effectively.

By using the Scrum methodology, the assignment will be broken into smaller pieces. Each of these pieces will be a functionality or user case, and they will be developed according to the 3 phases defined in chapter 5. This way, a functionality will be documented, developed, and tested, so the team will be then able to move into the next use case.

Sprints will be planned for a duration of 2 weeks. At the end of this period, the team will get together to hold the Sprint Review, where the Scrum Team and the key stakeholders review the work that has been done and give feedback. Followed by a Sprint Retrospective, where the Scrum Teams discuss how the last Sprint went and discuss ways to improve their effectiveness. Finally, the Sprint planning takes place to plan the upcoming Sprint.

Furthermore, there will be at least one weekly meeting with Pharox to discuss further questions that might arise while the development of the Sprint. This will be either Thursdays or Fridays at around 9:30, with preference for an online meeting via MS Teams. For informal communication or quick questions, the Slack channel provided by Pharox will be used. 

Atlassian Jira is used to manage the project and keep track of the progress. The backlog contains all the requirements and tasks that need to be done to complete the project. Also, it will be used to estimate the complexity of tasks, plan and track the different sprints, and assign tasks to the team members.

### 8.2 Work Environment

The work environment is built upon Google’s Firebase services. The backend with all calculations will be implemented in Firebase Cloud Functions. Pharox provides a separate Firebase project for the group to work with during the project. The source code and other artifacts will be stored in the FontysVenlo GitHub repository. After completion of the project the source code all related documents will be hand over to Pharox.

# 9. Planning

According to the SoFa’s workload, the team will be available for 20h/week during the duration of the semester 7 and academic holidays will be respected. Therefore, the team will be available from September to the end of December with the exceptions of weeks 42, 51 and 52.

For a more detailed planning see the table below:

| Sprint # | Start      | End        | Note                                              |
|----------|------------|------------|---------------------------------------------------|
| 0        | 15.9.2023  | 29.9.2023  |                                                   |
| 1        | 29.9.2023  | 13.10.2023 |                                                   |
| 2        | 13.10.2023 | 3.11.2023  | Autumn Holiday in between (16.10.2023-22.10.2023) |
| 3        | 3.11.2023  | 17.11.2023 |                                                   |
| 4        | 17.11.2023 | 1.12.2023  |                                                   |
| 5        | 1.12.2023  | 15.12.2023 |                                                   |
| 6        | 15.12.2023 | 22.12.2023 | Handover                                          |

# 10. Stakeholders

The following persons are stakeholders in this project:

| Name                   | Organization | Role                    | How to Engage       |
|------------------------|--------------|-------------------------|---------------------|
| Joris Tenhagen         | Pharox       | Project Owner           | Slack, Email, Teams |
| Niels Besseling        | Pharox       | Project Owner           | Slack, Email, Teams |
| Jules Eck              | Pharox       | Developer               | Slack               |
| Richard van den Ham    | Fontys       | Lecturer                | Slack, Email, Teams |
| Niklas Mezynski        | Fontys       | Developer               | Slack, Email, Teams |
| Ramon Zalmai Masodi    | Fontys       | Developer               | Slack, Email, Teams |
| Joel Sebastian Delgado | Fontys       | Developer               | Slack, Email, Teams |
| Patrick van Leipsig    | Fontys       | Developer, Scrum Master | Slack, Email, Teams |

# 11. Risks
The above described project comes with certain risks. These are mentioned and evaluated in the following table 1. In order to define the risk level, the risk matrix in the Appendix A has been used.

|Risk|Description|Probability|Impact|Risk level|Countermeasures|
|:----|:----|:----|:----|:----|:----|
|Pharox environment permissions|During implementation phase, developing team will need access to some of the existing software developed by Pharox. For that access permissions may be required.|5|2|High|<ul><li>Discuss with Pharox, in advance, what existing software can be used for this project.</li><li>Ask for access permissions before starting of the implementation phase</li></ul>|
|Data availability|In order to perform the GHG emissions calculations, both customer and application data is needed. It may be that such data has not been uploaded to the databases and therefore is not available.|2|4|Moderate|<ul><li>Provide the system with default data to be able to perform estimations.</li><li>Inform the user that data is not available and therefore accurate calculations cannot be done.</li></ul>|
|Pharox stakeholders’ availability|Pharox stakeholders’ availability is needed on a weekly basis in order to make sure project adapts to their necessities and also to solve any questions or issue that might appear. It can happen that, due to other projects, Pharox stakeholders’ availability is limited.|1|1|Very low|<ul><li>Set up periodically sprint review meetings, where deliveries can be done, and feedback can be given.</li><li>Set up a weekly meeting, where all parties are available to talk about actual status and discuss any issues.</li></ul>|
|Calculation exceptions|As mentioned in the GLEC framework and in alignment with end user’s needs, it can be that special considerations have to be taken into a count while performing the GHG emissions calculations. It may be that such considerations are not possible to be applied at the moment of the calculation.|2|4|Medium|<ul><li>Perform an extensive requirements assessment before starting of implementation.</li><li>Build scalable solution where exceptions can be added to the GHG emissions calculations functions.</li></ul>|

# 12. Appendix
### A. Risk matrix
<figure>
    <img src="./resources/RiskMatrix.png"
         alt="Albuquerque, New Mexico">
    <figcaption style="text-align: center">Figure 1: Risk management matrix (Safety Culture, 2023)</figcaption>
</figure>

# Bibliography
- Burns, E., Laskowski, N., & Tucci, L. (2023, September 12). What is Artificial Intelligence? Retrieved from What is Artificial Intelligence?: https://www.techtarget.com/searchenterpriseai/definition/AI-Artificial-Intelligence#:~:text=Artificial%20intelligence%20is%20the%20simulation,speech%20recognition%20and%20machine%20vision.
- CBS. (2023, September 12). Statistics Nederlands. Retrieved from Statistics Nederlands: https://www.cbs.nl/en-gb
Pharox. (2023, September 12). Pharox. Retrieved from Pharox: https://pharox.io/
- Safety Culture. (2023, September 19). A Guide to Understanding 5x5 Risk Matrix. Retrieved from A Guide to Understanding 5x5 Risk Matrix: https://safetyculture.com/topics/risk-assessment/5x5-risk-matrix/
- Smart Freight Centre. (2023, September 12). The GLEC Framework. Retrieved from The GLEC Framework: https://www.smartfreightcentre.org/en/our-programs/global-logistics-emissions-council/calculate-report-glec-framework/
- UIPath. (2023, September 12). Robotic Process Automation. Retrieved from Robotic Process Automation: https://www.uipath.com/rpa/robotic-process-automation
