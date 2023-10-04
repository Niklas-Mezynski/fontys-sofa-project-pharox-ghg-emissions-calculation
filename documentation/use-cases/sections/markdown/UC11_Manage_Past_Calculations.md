<!-- START UC11 -->
<table>
<thead>
<tr>
<th>#</th>
<th>11</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Name**

</td>
<td>

User wants to manage the previously stored emission calculations.

</td>
</tr>
<tr>
<td>

**Description**

</td>
<td>

As a User I want to manage the previously stored emission calculations. This includes deleting calculations and editing calculation's metadata.

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

- Users
- Administrators

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

- The user is authenticated.
- The user has access to the emission calculations.
- The user has the rights to manage the emission calculations.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. The user requests to manage a certain previously stored emission calculation.
2. The system returns the previously stored emission calculation.
3. The user edits the metadata of the emission calculation.
4. The user saves the changes.
5. The system updates the previously stored emission calculation.

</td>
</tr>
<tr>
<td>

**Results**

</td>
<td>

The previously stored emission calculations are updated to the user's preferences.

</td>
</tr>
<tr>
<td>

**Exceptions**

</td>
<td>

1. 1
- The requested emission calculation does not exist.
- The system returns an error message to the user.

</td>
</tr>
<tr>
<td>

**Extensions**

</td>
<td>

3. 1
- The user requests to delete the previously stored emission calculation.
- The system deletes the previously stored emission calculation.

</td>
</tr>
</tbody>
</table>
<!-- END UC11 -->