<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC3_TC1</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can successfully calculate GLEC Framework Scope 3 Emissions when all general information is provided

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 3 emission calculation using the following information from a road transport:
  - Vehicles using a Diesel/Biodiesel Blend consumed `374,285l` of fuel
  - Vehicles using a Gasoline/Ethanol Blend consumed `85,364l` of fuel
2. User sends the request to the application
3. System accepts the request
4. System performs calculation
5. System responds with the following information:
  - Emissions by first vehicle type `235,800 kg of CO2-equivalent`
  - Emissions by second vehicle type `42,682 kg of CO2-equivalent`
  - Total of `278,482 kg of CO2-equivalent` emissions

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
<th>UC3_TC2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that the system can handle missing information when any of the required information fields are missing, which are:
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

1. User requests Scope 3 emission calculation using the following information from a road transport:
  - Vehicles consumed `187,000l` of fuel
2. User sends the request to the application
3. System detects that fuel type is missing
4. System responds with an error message indicating that fuel type is missing

</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

An error informing the user what information is missing

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC3_TC3</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that System returns an error when there is no corresponding emission factor for the provided information

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 3 emission calculation providing a consumption of 374285 `l` of rainbow blend 95/5 during a Tank-to-Wheel road transportation activity
2. User sends the request to the application
3. System detects that there is no emission factor for the provided fuel type
4. System responds with an error message indicating that there is no emission factor for the provided fuel type

</td>
</tr>
<tr>
<td>

**Expected Result**

</td>
<td>

System error informing of missing emission factor for the provided fuel type

</td>
</tr>
</tbody>
</table>

----

<table>
<thead>
<tr>
<th>Test Case ID</th>
<th>UC3_TC4</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Description**

</td>
<td>

Verify that System can perform calculations using other possible input data

</td>
</tr>
<tr>
<td>

**Test Steps**

</td>
<td>

1. User requests Scope 3 emission calculation using the following information from an air transport activity:
  - Plane using Jet Fuel A assuming a standard emission intensity of `0.702 kg CO2e/tkm`
  - The total tonne-kilometers of the transport is `1,301 tkm`
2. User sends the request to the application
3. System accepts the request
4. System performs calculation
5. System responds with the following information:
  - Total emissions of that transport activity `913 kg of CO2-equivalent`

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
