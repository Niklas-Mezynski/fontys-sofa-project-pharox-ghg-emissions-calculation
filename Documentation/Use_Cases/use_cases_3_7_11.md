<!-- Start UC 3 -->
<table>
<thead>
<tr>
<th>#</th>
<th>3</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Name**

</td>
<td>

Calculate Scope 3 Emissions

</td>
</tr>
<tr>
<td>

**Description**

</td>
<td>

As a user I want to calculate Scope 3, the Supply chain emissions, based on the GLEC Framework. These are the emissions the company is not directly responsible for them, but they are part of the company's value chain.

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
- User is authenticated.
- Users has the relevant data available.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. The Software User initiates the emission calculation process through the software.
2. The user specifies the minimum set required data. This is required per transport mode and includes:
   - The type of transport (Transport mode)
   - The fuel in `kg` used during transport
   - The type of fuel used during transport
   - The distance in `km` the goods are transported. This should be, in the worst case, at least the *Network distance*.
   - The weight in `tonnes` of the goods transported
3. The software processes the input data and calculates emissions in accordance with the GLEC Framework.
4. The results are returned to the user, providing an overview of greenhouse gas emissions in `kg of CO2-equivalents`.
5. User reviews the calculated emissions and may choose to save them for later use.

</td>
</tr>
<tr>
<td>

**Results**

</td>
<td>

The software generates accurate greenhouse gas emissions calculations based on the provided data. Users gain insights into their emissions on Scope 3 level.

</td>
</tr>
<tr>
<td>

**Exceptions**

</td>
<td>

2. 1
- The user provides insufficient data.
- The software returns an error message to the user.
3. 1
- The system cannot find the correct emission factors for the calculation.
- The system returns an error message to the user.
3. 2
- System encounters and error while performing the calculation.
- The system returns an error message to the user.

</td>
</tr>
<tr>
<td>

**Extensions**

</td>
<td>

2. 1
- The user provides a more precise distance in `km` the goods are transported. In the best case, this is the *Actual distance*.
- The system calculates more accurate emissions.
2. 2
- The user provides the CO2-equivalent intensity factor for the fuel used during transport.
- The system calculates the total emissions based on the provided intensity factor and the tonne kilometers.
2. 3
- The user provides its own emission factors for the calculation process.
- The system calculates the total emissions based on the provided emission factors.

</td>
</tr>
</tbody>
</table>
<!-- END UC3 -->

---

<!-- START UC7 -->
<table>
<thead>
<tr>
<th>#</th>
<th>7</th>
</tr>
</thead>
<tbody>
<tr>
<td>

**Name**

</td>
<td>

User wants to read emission factors

</td>
</tr>
<tr>
<td>

**Description**

</td>
<td>

As a user I want to read the emission factors used by the software.
As an administrator I want to read the emission factors used by the software in order to maintain them.

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
- The user has access to the emission factors.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. The user makes a request to read the emission factors.
2. The software returns the emission factors to the user.
3. The user can read the list of emission factors.

</td>
</tr>
<tr>
<td>

**Results**

</td>
<td>

The user gains insights into the emission factors used by the software.

</td>
</tr>
<tr>
<td>

**Extensions**

</td>
<td>

1. 1
- The user requests to read the emission factors for a specific transport mode.
- The system returns the emission factors for the specific transport mode.
1. 2
- The user requests to read the emission factors for a specific fuel.
- The system returns the emission factors for the specific fuel.

</td>
</tr>
</tbody>
</table>
<!-- END UC7 -->

---

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
