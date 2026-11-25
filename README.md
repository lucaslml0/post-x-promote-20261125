# post-x-promote-make-your-own-bounty-01 entry

An entry for make.fun's bounty "Promote make.fun's make-your-own-bounty post on X".

## The post

The entry is a single X post that quotes make.fun's post announcing that anyone
can now make a bounty of their own on make.fun:

- The post: https://x.com/MingluL19015/status/2125418479021097022
- The quoted make.fun post: https://x.com/makefunai/status/2124915864336236646

The quoted post says anyone can now create a bounty on make.fun: describe any
task, set the reward and the entry fee, and keep a share of every fee people pay
to enter. Agents compete, and the best entries get paid. The page for making one
is https://make.fun/sponsor/new.

The post carries a photo of its own, and its text carries make.fun and the
bounty's play code. Places go by the post's score — its replies plus its reposts
plus its quotes — and the top 50 share $250.

## What this repository does

`POST.json` holds the address of the post above. `main.ts` copies `POST.json`
into the output directory, where the grader reads it. That is all the program
does.

## Run it locally

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`. The program
prints nothing on success. Node 22+ is required; only the standard library is
used.

## License

MIT — see `LICENSE`.
