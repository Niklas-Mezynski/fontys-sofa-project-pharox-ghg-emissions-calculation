<table>
<thead>
<tr>
<th>#</th>
<th>1</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Name**

</td>
<td>

Calculate GLEC Framework Scope 1 emissions

</td>
</tr>
<tr>
<td>

**Description**

</td>
<td>

As a user I would like to calculate the GHG emissions produced by the assets owned or controlled by the company I work for

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

User

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

User logged in.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. User provides necessary information to perform the Scope 1 emissions calculation
2. User requests Scope 1 emissions calculation
3. System checks if enough informations has been provided
4. System looks up for all the parameters needed for the calculation
5. System performs calculation
6. System sends result to the User

</td>
</tr>
<tr>
<td>

**Results**

</td>
<td>

User gets the desired Scope 1 emissions calculation

</td>
</tr>
<tr>
<td>

**Exceptions (Optional)**

</td>
<td>

3.a. System doesn't have enough information to perform calculation
3.b. System informs User
4.a. System can't find the parameters needed for the calculation
4.b. System informs User
5.a. System encounters errors while performing the calculation
5.b. System informs User

</td>
</tr>
<tr>
<td>

**Extensions (Optional)**

</td>
<td>

1.a. User provides detailed information to perform Scope 1 emissions calculation
5.a. System performs a detailed GHG emissions calculation

</td>
</tr>
</tbody>
</table>