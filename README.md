# Introduction
This is the source code repository for PG&E's version of SAP Service & Asset Manager 2205.

The following branches are used to differentiate the enhanced codebase from SAP standard metadata:
   - standard:  SAP Standard Metadata
   - master:  PG&E Enhanced Metadata (with tags for each production deployment)

Commits that are deployed to Producion should be versioned with tags using the following convention:
   2205.<SAP Support Package Number>.<SAP Patch Level>.<PG&E Feature Level>.<PG&E Patch Number> (e.g. 2205.0.2.1.0).
This version number should also be specified in the Application.app file.

# Important Notes
1. Please attempt to keep the master branch clean with only tagged commits that have been deployed to Production.
2. Please always edit MDK artifacts (definitions for pages, actions, etc.) in code view.  Opening them in the corresponding Mobile Development Kit gui via SAP Business Application Studio rearranges the JSON and makes future comparisons difficult, compounding the complexity of an upgrade.