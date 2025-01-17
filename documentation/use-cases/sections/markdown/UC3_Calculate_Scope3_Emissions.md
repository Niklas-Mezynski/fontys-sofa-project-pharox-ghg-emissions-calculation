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