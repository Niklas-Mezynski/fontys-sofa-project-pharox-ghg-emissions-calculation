# 8. Results

The desired product is a modular software solution aimed at calculating and managing GHG emissions. The system shall be able to make precise calculations of these emissions using the GLEC framework. The primary focus will be on the calculation of GLEC Scope 1 emissions. GLEC Scope 1 describes all direct emissions that are owned by the company and produced by them in production steps or their own supply chain.

The core functionality is about the pure calculations of GHG emissions. This involves the implementation of cloud functions that expect required input data and perform the several calculation steps. They must be valid, reliable, and compliant with the guidelines and methods described in the GLEC framework.

To make the system flexible and easy to integrate into existing customer solutions, the system will be designed in a modular way. All calculation steps shall be separated into separate functions to make them testable as independent pieces. This also ensures that parts can easily be exchanged or adapted for integration with existing customer products. 

The accuracy and reliability of the calculations of GHG emissions is of high importance as customers rely on this system to create official emission reports. Therefore, the system validated within a detailed testing process. To validate results external, trusted APIs that already implement the framework can be used.

If the calculations are properly implemented for GLEC Scope 1, the system shall be extended with the calculations for GLEC Scope 2 and 3. This will enable customers to create full emission reports once they have all the necessary data available. 

## 8.2 Optional Extensions

Once the calculations are validated and approved, the cloud system may be integrated with existing data sources of Pharox’ customers. The existing system will be extended with more modular functions that allow reading and mapping data from different sources into a desired format so that the calculation steps can be applied.

Another feature may be the implementation of a graphical user interface or dashboard. It shall provide an interface for users to input data. The system must then calculate the emissions and display them in a proper way. Optionally, the system may suggest points of improvement where the user could save GHG emissions. There is a separate chapter in the GLEC framework covering this topic.

