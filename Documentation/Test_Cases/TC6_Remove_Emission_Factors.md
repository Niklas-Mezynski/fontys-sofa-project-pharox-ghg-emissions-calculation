<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC6_TC1</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can successfully remove emission factors

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to remove a certain emission factor by providing valid indormation such as the ID
2. System find the emission factor the User refers to
3. System removes the emission factor
4. System responds with a operation successful message
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

The emission factor is not longer available in the system

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC6_TC2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

System error when trying to delete a non existing emission factor

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to remove a certain emission factor by providing valid indormation such as the ID
2. System can't find the emission factor the User refers to
3. System responds with a cannot find the given emission factor error or not possible to delete such emission factor error
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

System returns an error when is not possible to remove an emission factor

</td>
</tr>
</tbody>
</table>
