## Code Scanning Merge Protection

> requires passing [CodeQL][code-ql] checks

Rulesets are setup which prevent pull requests from being merged.  
This check tries to determine if the project uses Static Application   
Security Testing (SAST), also known as static code analysis.    
It is currently limited to repositories hosted on GitHub, and does not   
support other source hosting repositories (i.e., Forges).  
 
[codeql]: https://codeql.github.com/
