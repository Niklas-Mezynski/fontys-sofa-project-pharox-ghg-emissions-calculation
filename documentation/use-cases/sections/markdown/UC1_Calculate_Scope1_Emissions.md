<!-- UC1 -->
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

As a User, I would like to calculate the GHG emissions produced by the assets owned or controlled by the company I work for

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

1. User provides necessary information to perform the Scope 1 emissions calculation. The minimum information needed consists of:
   - The type of transport (Transport mode)
   - The fuel in `kg` or `l` used during transport
   - The type of fuel used during transport
   - Emission type (Well-to-Tank, Tank-to-Wheel, Well-to-Wheel)
2. User requests Scope 1 emissions calculation
3. System checks if enough informations has been provided
4. System performs calculation
5. System sends result to the User in `kg of CO2-equivalent`

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

**Exceptions**

</td>
<td>

3.
    a. System doesn't have enough information to perform calculation
3.
    b. System informs User and ends request
4.
    a. System encounters errors while performing the calculation
4.
    b. System informs User and ends request

</td>
</tr>
<tr>
<td>

**Extensions**

</td>
<td>

1.
    a. User provides detailed information to perform Scope 1 emissions calculation, which can consist of:
    - The different vehicle types
    - The amount of fuel used by each vehicle in `kg` or `l`
    - The fuel type used by each vehicle
1.
    b. Continue with scenario until step 4
4.
    a. System performs a detailed GHG emissions calculation which is described per vehicle used

</td>
</tr>
</tbody>
</table>