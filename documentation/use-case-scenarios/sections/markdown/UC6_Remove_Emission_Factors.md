<!-- UC6 -->
<table>
<thead>
<tr>
<th>#</th>
<th>6</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Name**

</td>
<td>

Remove an emission factor

</td>
</tr>
<tr>
<td>

**Description**

</td>
<td>

As an Admin, I would like to remove any unused or wrong emission factor from the available dataset

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

Admin

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

User logged in with admin credentials.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. User requests to remove a certain emission factor
2. System checks if given emission factor exists
3. System removes the desired emission factor
4. System notifies the User

</td>
</tr>
<tr>
<td>

**Results**

</td>
<td>

The emission factor is removed from the System

</td>
</tr>
<tr>
<td>

**Exceptions**

</td>
<td>

2.
    a. System can't find the given emission factor
2.
    b. System informs User and ends request

</td>
</tr>
</tbody>
</table>