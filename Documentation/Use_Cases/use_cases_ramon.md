<table>
  <thead>
<tr>
<th>#</th>
<th>-4</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>
    (Admin) Wants to manage emission factors
    </td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
    Edit emission factors
    </td>
  </tr>
  <tr>
    <td>Actors</td>
    <td>
    Admin
    </td>
  </tr>
  <tr>
    <td>Pre-Conditions</td>
    <td>
    Actor is authenticated
    </td>
  </tr>
  <tr>
    <td>Scenario</td>
    <td>
    <ol>
        <li>Actor invokes the API call to edit emission factor and provides the new value</li>
        <li>System sends the request with the provided value</li>
    </ol>
    </td>
  </tr>
  <tr>
    <td>Results</td>
    <td>
    Emission factor has been edited
    </td>
  </tr>
</tbody>
</table>








<table>
  <thead>
<tr>
<th>#</th>
<th>-8</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>
    User wants to authenticate themselves
    </td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
    Authentication of a user to gain access to the app
    </td>
  </tr>
  <tr>
    <td>Actors</td>
    <td>
    All users
    </td>
  </tr>
  <tr>
    <td>Pre-Conditions</td>
    <td>
    User is not authenticated
    </td>
  </tr>
  <tr>
    <td>Scenario</td>
    <td>
    <ol>
        <li>Actor invokes the authentication API call and provides credentials</li>
        <li>System sends the API call and checks the credentials</li>
    </ol>
    </td>
  </tr>
  <tr>
    <td>Results</td>
    <td>
    Actor has been authenticated
    </td>
  </tr>
  <tr>
    <td>Exceptions (Optional)</td>
    <td>
    Authentication credentials were invalid
    </td>
  </tr>
</tbody>
</table>









<table>
  <thead>
<tr>
<th>#</th>
<th>-12</th>
</tr>
</thead>
<tbody>
  <tr>
    <td>Name</td>
    <td>
    User wants to have an API overview
    </td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
    Displaying of the API functionality
    </td>
  </tr>
  <tr>
    <td>Actors</td>
    <td>
    All users
    </td>
  </tr>
  <tr>
    <td>Pre-Conditions</td>
    <td>
    User is authenticated
    </td>
  </tr>
  <tr>
    <td>Scenario</td>
    <td>
    <ol>
        <li>Actor navigates to the page containing the information about the API</li>
        <li>The information is being displayed</li>
    </ol>
    </td>
  </tr>
  <tr>
    <td>Results</td>
    <td>
    Actor can see the explanations of the different API calls
    </td>
  </tr>

</tbody>
</table>
