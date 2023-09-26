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

The software calculates Scope 3, the Supply chain emissions, based on the GLEC Framework. The company is not directly responsible for them, but they are part of the company's value chain.

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

Individuals, organizations or regulatory authorities that want to calculate their emissions.

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

Users have access to relevant data sources or databases.

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

1. Insufficient or inaccurate data may lead to incomplete or inaccurate emissions calculations.
2. Technical issues or errors during data input or calculation processes.

</td>
</tr>
<tr>
<td>

**Extensions**

</td>
<td>

- Extension 2.1: More data may be added to the software to improve the accuracy of the calculations.
  - The user may provide its own emission factors for the calculation process.
  - The user provides a more precise distance in `km` the goods are transported. In the best case, this is the *Actual distance*.
  - The user already has the CO2-equivalent intensity factor available for the fuel used during transport.
    - This scenario would only require the tonne kilometers to calculate the total emissions.

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

As there are many emission factors, for different transport modes and fuels, the user wants to read the emission factors used by the software.

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

- Individuals, organizations or regulatory authorities that want to calculate their emissions.
- Administrators that want to manage and maintain the emission factors.

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

- The user is authenticated and has access to the software.
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
3. The user reviews the emission factors.

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

- Extension 1.1: The user may request to read the emission factors for a specific transport mode.
- Extension 1.2: The user may request to read the emission factors for a specific fuel.

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

The user wants to manage the previously stored emission calculations. This includes:
- Editing the previously stored emission calculations.
- Deleting the previously stored emission calculations.

</td>
</tr>
<tr>
<td>

**Actors**

</td>
<td>

- Customers that own the emission calculation data.
- Administrators that want to manage and maintain the emission calculations.

</td>
</tr>
<tr>
<td>

**Pre-Conditions**

</td>
<td>

- The user is authenticated and has access to the software.
- The user has access to the emission calculations.
- The user has the rights to manage the emission calculations.

</td>
</tr>
<tr>
<td>

**Scenario**

</td>
<td>

1. The user makes a request to manage the emission calculations.
2. The software returns the emission calculations to the user. (See UC 10)
3. The user reviews the emission calculations.
4. The user may choose to edit or delete the emission calculations.
5. The user may choose to save the edited emission calculations.
6. The user may choose to delete the emission calculations.
7. The software processes the request and returns the results to the user.

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
</tbody>
</table>
<!-- END UC11 -->
