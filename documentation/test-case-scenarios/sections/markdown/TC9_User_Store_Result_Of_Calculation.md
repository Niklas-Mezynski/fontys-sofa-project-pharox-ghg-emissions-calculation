<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC9_TC1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the User can successfully store the result of their calculation for later use and/or review.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as a User.</li>
          <li>Complete an emission calculation.</li>
          <li>See the result of the calculation.</li>
          <li>Send a request to the system to save the calculation.</li>
          <li>Verify that the system processes the request.</li>
          <li>Check if the system stores the calculation result.</li>
          <li>Confirm that the system returns a success message to the User.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The calculation result should be successfully stored within the application, and the User should receive a success message.</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC9_TC2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the calculation fails, and the User attempts to store the result.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as a User.</li>
          <li>Start an emission calculation that fails.</li>
          <li>Attempt to save the result of the failed calculation.</li>
          <li>Verify that the system detects the calculation failure.</li>
          <li>Check if the system provides an appropriate error message to the User.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the calculation failure and provide an error message to the User.</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC9_TC3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where communication to the database fails when the User attempts to store a calculation result.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as a User.</li>
          <li>Complete an emission calculation successfully.</li>
          <li>See the result of the calculation.</li>
          <li>Send a request to the system to save the calculation.</li>
          <li>Simulate a database communication failure during the storage process.</li>
          <li>Verify that the system appropriately handles the database communication failure.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should handle the database communication failure gracefully and provide an error message or notification to the User indicating the failure to store the calculation result.</td>
    </tr>
  </tbody>
</table>
