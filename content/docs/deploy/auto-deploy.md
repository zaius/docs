---
tags: deployment, autodeploy
---

## Auto deploy

Wercker supports auto-deployment, this means that a green build automatically gets deployed to a specified deploy target.

This is convenient for instance, for low-risk applications such as or to deploy to either a staging environment or feature branch environment. As such, wercker allows you to specify the [git branch](http://git-scm.com/book/en/Git-Branching-Basic-Branching-and-Merging) that you want auto deployed.

Note with great power comes great responsibility, so be careful with what gets auto-deployed to which environment.

#### Wildcard

Currently we support a simple **wildcard** to match against branches. The following formats are supported:

- Exact match. This will match the value only if they are exactly the same.
- A single asterisk `*`. This will match every value.
- A asterisk at the beginning `*/foobar`. This will match values that end with a specific value, but it doesn't matter what the begin is.
- A asterisk at the end `foobar/*`. This will match values that begin with a specific value, but it doesn't matter what the end is.

The following situations are not supported:

- A asterisk in the middle of the value `foo*bar`. This asterisk will be a literal asterisk.
- A asterisk at the beginning and end `​*foobar*​`. This will just match the first asterisk.
