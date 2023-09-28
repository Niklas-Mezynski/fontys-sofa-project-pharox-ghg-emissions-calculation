<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC10_TC1</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can successfully provide all the past emissions calculations belonging to a certain user

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to view past emissions calculations
2. System finds past emissions calculations belonging to the User
3. System returns all the past emissions calculations that has found
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

All the past emissions calculations belonging to the User

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC10_TC2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system returns empty list when no past emissions calculations exist for a certain user

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to view past emissions calculations with or without providing filter options
2. System can't find past emissions calculations belonging to the User
3. System returns an empty list
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

Empty list

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC10_TC3</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system returns past emissions calculations, matching certain filter conditions, belonging to a certain user

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to view past emissions calculations providing valid filter options like calculation dates or period
2. System finds past emissions calculations matching filter conditions and belonging to the User
3. System returns the found past emissions calculations
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

The found past emissions calculations belonging to the User

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC10_TC4</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that System returns an error when an invalid filter is provided

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests to view past emissions calculations providing invalid filter options like invalid dates
2. System can't parse the provided filter
3. System returns invalid filter error
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

System error informing of an invalid filter provided

</td>
</tr>
</tbody>
</table>

----