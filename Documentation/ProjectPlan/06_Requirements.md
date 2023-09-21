## 6. Requirements
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
