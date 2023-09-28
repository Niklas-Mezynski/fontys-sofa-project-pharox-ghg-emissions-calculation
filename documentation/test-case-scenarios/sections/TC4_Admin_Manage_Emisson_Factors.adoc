<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC4_TC1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the Administrator can successfully edit an emission factor to the database.</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator</li>
          <li>Send a request to edit an emission factor with the new value</li>
          <li>Verify that the system processes the request</li>
          <li>Check if the system eidts the emission factor</li>
          <li>Confirm that the Administrator receives a success message</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The emission factor should be edited in the application, and the Administrator should receive a success message</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC4_TC2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the emission factor being edited already has the same value</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator</li>
          <li>Send a request to edit an emission factor with the new value</li>
          <li>Verify that the system detects that the new emission factor provided is the same as the old one</li>
          <li>Check if the system provides an appropriate error message to the Administrator</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should notify the user that the new emission factor is the same as the old one</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC4_TC3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the system handles a scenario where the Administrator inserts an invalid value for the emission factor</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Authenticate as an Administrator</li>
          <li>Send a request to change the emisison factor to an invalid value</li>
          <li>Verify that the system detects the invalid value</li>
          <li>Check if the system provides an appropriate error message to the Administrator</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the invalid value and provide an error message to the Administrator</td>
    </tr>
  </tbody>
</table>
