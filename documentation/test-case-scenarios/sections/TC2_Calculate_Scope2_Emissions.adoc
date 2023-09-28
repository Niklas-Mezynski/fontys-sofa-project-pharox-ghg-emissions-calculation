<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC2_TC1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system can successfully calculate Scope 2 Emissions when all necessary information is provided.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as a regular user.</li>
          <li>Enter valid basic information required for Scope 2 Emissions calculation.</li>
          <li>Send the request to the application.</li>
          <li>Verify that the system processes the request without errors.</li>
          <li>Check if the system sends the correct result back to the user.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should calculate and return the correct Scope 2 Emissions value.</td>
    </tr>
  </tbody>
</table>

----

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC2_TC2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the user does not provide all the necessary information.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as a regular user.</li>
          <li>Enter incomplete or missing basic information required for Scope 2 Emissions calculation.</li>
          <li>Send the request to the application.</li>
          <li>Verify that the system detects the missing information.</li>
          <li>Check if the system provides an appropriate error message to the user.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the missing information and provide a clear error message to the user.</td>
    </tr>
  </tbody>
</table>

----

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC2_TC3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system restricts unauthorized users from accessing the Scope 2 Emissions calculation.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Attempt to access the Scope 2 Emissions calculation without authentication.</li>
          <li>Enter valid basic information.</li>
          <li>Send the request to the application.</li>
          <li>Verify that the system denies access and returns an unauthorized error message.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should deny access to unauthorized users and return an appropriate error message.</td>
    </tr>
  </tbody>
</table>
