<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC1_TC1</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can successfully calculate GLEC Framework Scope 1 Emissions when all general information is provided

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 1 emission calculation providing the following information during a Well-to-Wheel road transportation activity:
  - Gasoline Van using Gasoline/Ethanol 95/5 Blend and consuming 85364 `l`
  - 7.5 t Diesel Truck using Diesel/Biodiesel Blend 95/5 and consuming 127257 `l`
  - 40 t/Class 8 Truck using Diesel/Biodiesel Blend 95/5 and consuming 7486 `l`
2. User sends the request to the application
3. System accepts the request
4. System performs calculation
5. System responds with the following information:
  - Total of 666153 `kg of CO2-equivalent` emissions
  - Gasoline Van total of 239019 `kg of CO2-equivalent` emissions
  - 7.5 t Diesel Truck total of 403404 `kg of CO2-equivalent` emissions
  - 40 t/Class 8 Truck total of 23730 `kg of CO2-equivalent` emissions
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

The `kg of CO2-equivalent` produced by the fuel consumption given by the User

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC1_TC2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can successfully calculate more detailed GLEC Framework Scope 1 Emissions when all detailed information is provided

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 1 emission calculation providing a consumption of 374285 `l` of diesel-biodiesel blend 95/5 during a a Tank-to-Wheel activity
2. User sends the request to the application
3. System detects that transportation type is missing
4. System responds with a missing transportation type
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

The `kg of CO2-equivalent` produced by the fuel consumption by each of the vehicles given by the User

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC1_TC3</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that System returns an error when any of the required information fields are missing, which are:
  - The type of transport (Transport mode)
  - The fuel in `kg` or `l` used during transport
  - The type of fuel used during transport
  - Emission type (Well-to-Tank, Tank-to-Wheel, Well-to-Wheel)  

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 1 emission calculation missing one or more of the required information
2. User sends the request to the application
3. System detects that information is missing
4. System responds with a data missing error
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

System error informing of missing data during the calculation

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC1_TC4</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that System returns an error when calculation can't be performed

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 1 emission calculation providing a consumption of 374285 `l` of orange juice blend 95/5 during a Tank-to-Wheel road transportation activity
2. User sends the request to the application
3. System accepts the request
4. System tries to perform such calculation but provided data is not correct
5. System responds with a calculation not possible error
   
</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

System error informing of not possible to perform such calculation

</td>
</tr>
</tbody>
</table>
