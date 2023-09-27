<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC5_TC1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the Administrator can successfully add an emission factor to the database.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator.</li>
          <li>Send a request to add a valid emission factor.</li>
          <li>Verify that the system processes the request.</li>
          <li>Check if the system adds the emission factor.</li>
          <li>Confirm that the Administrator receives a success message.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The emission factor should be added to the application, and the Administrator should receive a success message.</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC5_TC2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the emission factor being added already exists in the database.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator.</li>
          <li>Send a request to add an emission factor that already exists in the database.</li>
          <li>Verify that the system detects the existing emission factor.</li>
          <li>Check if the system provides an appropriate error message to the Administrator.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the existing emission factor and provide an error message to the Administrator.</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC5_TC3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the Administrator inserts an invalid value for the emission factor.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator.</li>
          <li>Send a request to add an invalid emission factor.</li>
          <li>Verify that the system detects the invalid value.</li>
          <li>Check if the system provides an appropriate error message to the Administrator.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the invalid value and provide an error message to the Administrator.</td>
    </tr>
  </tbody>
</table>

---

