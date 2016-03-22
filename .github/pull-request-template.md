## Brief description/ PR title
- Status: DNM/Ready for review

### PR: develop -> master
Brief summary of what changes are to be rolled out to live infrastructure

#### Dependencies
Description of other PRs/repos that are dependent on what has changed e.g. api.kent

#### Deploy checklist
##### Before deploy:
- [ ] develop on the test server
- [ ] any dependencies (other repos) on the test server
- [ ] all changes tested on test server
- [ ] necessary comms sent out to affected users
- [ ] system booking is in place
- [ ] config changes have been put onto live server (.env/config.php etc)

##### After deploy:
- [ ] All dependencies rolled out to live
- [ ] Migrations run on live server
- [ ] Seeds run on live server
- [ ] Changes tested on live
- [ ] System booking closed
- [ ] Relevant FootPrints tickets responded to
- [ ] Relevant Trello cards moved to done
- [ ] Product owner/stakeholders updated (if no Trello/FP ticket)

### PR: Feature branch -> develop
- Trello: link to trello card *(if applicable)*
- FootPrints: ticket number *(if applicable)*

#### Related PRs
List related PRs/branches

#### Where should the reviewer start?
Outline the steps to test or reproduce the PR here

```
git pull --prune
git checkout <feature_branch>
```

- Necessary config changes
- Any migrations/seeds to be run
- Necessary corresponding PRs
- How to access new/changed functionality

#### Impacted Areas in Application
List general components of the application that this PR will affect

#### Todos
- [ ] Code follows [KentStandards](https://github.com/unikent/KentStandards)
- [ ] Assets have been built & revisioned
- [ ] Tests added
- [ ] Tests passed
- [ ] Documentation:
  - [ ] GitHub README.md updated
  - [ ] Shire documents updated
- [ ] Changes tested and working in supported browsers
