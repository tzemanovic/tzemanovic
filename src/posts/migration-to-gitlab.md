---
title: Migration to GitLab
tags: blog, github, gitlab, microsoft, continuous delivery, easy
published: 2018-06-06
---

For no reason in particular at all :), I moved my website over to GitLab pages from GitHub pages. On the way, I got a pleasant surprise with the integrated CI/CD, which made it really easy to replace my [release script](https://github.com/tzemanovic/tzemanovic/blob/2f55be06722f1e13a030d02a988a1d9abcc5b287/src/publish.sh) that simply pushed built project into another repository that was hosting the page with [a job configuration that handles build and release in the same repository](https://gitlab.com/tzemanovic/tzemanovic.gitlab.io/blob/master/.gitlab-ci.yml), nice and easy.
