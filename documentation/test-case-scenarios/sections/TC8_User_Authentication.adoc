<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC8_TC1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the User provided valid authentication credentials</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Send the credentials to be verified</li>
          <li>Verify that the system responded with a success message</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The user has been authenticated</td>
    </tr>
  </tbody>
</table>

---

<table>
  <thead>
    <tr>
      <th>Test Case ID</th>
      <th>UC8_TC2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Description</td>
      <td>Verify that the User provided invalid credentials</td>
    </tr>
    <tr>
      <td>Test Steps</td>
      <td>
        <ol>
          <li>Send the credentials to be verified</li>
          <li>Verify that the system responded with an error message</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td>Expected Result</td>
      <td>The system should detect the the invalid credentials and respond with an error message</td>
    </tr>
  </tbody>
</table>
