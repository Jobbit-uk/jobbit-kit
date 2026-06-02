import { publicEnv } from "./env";

const JOBBIT_LOGO_MASK =
  "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjk2IiBoZWlnaHQ9IjIyOSIgdmlld0JveD0iMCAwIDY5NiAyMjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02OC4wOTIxIDE3NS44NDVDNjguMjU5NCAxODIuNjM0IDY2Ljk4NDEgMTg5LjM4MiA2NC4zNTA0IDE5NS42NDJDNTkuODY4OSAyMDUuOTI4IDUxLjg5NDEgMjE0LjI5OSA0MS44MzUgMjE5LjI3N0MzNy4yMzUzIDIyMS41OSAzMi40NDgyIDIyMy41MSAyNy41MjQ5IDIyNS4wMTdDMjMuMTk5IDIyNi4zNTEgMTguNzYwOSAyMjcuMjkgMTQuMjY1MSAyMjcuODIyQzExLjAzNjQgMjI4LjIzMiA3Ljc4Nzc4IDIyOC40NjggNC41MzM1OSAyMjguNTI3QzEuMTAzNzYgMjI4LjUyNyAtMC4zODk1OTIgMjI2Ljc0IDAuMDg2MzE3IDIyMy4xNDhMMi44OTI1MiAyMDEuMzMzQzMuMzczOSAxOTguMjE3IDUuMzI2NzggMTk2Ljg5NCA4Ljc1MTE0IDE5Ny4zNjRDMTEuMDQ1NiAxOTcuNjgyIDEzLjM2IDE5Ny44MzYgMTUuNjc2NCAxOTcuODIzQzE4LjE5MzUgMTk3Ljg0MSAyMC42ODEgMTk3LjI4IDIyLjk0NjMgMTk2LjE4M0MyNS40MDQzIDE5NC45MDMgMjcuNDA5NCAxOTIuODk5IDI4LjY5MDEgMTkwLjQ0M0MzMC40NDI2IDE4Ni44MzIgMzEuMjUgMTgyLjgzNyAzMS4wMzY4IDE3OC44M1Y2My4zMjkxQzMwLjk0NjQgNjIuNjkyIDMxLjAwNTYgNjIuMDQyNiAzMS4yMDk1IDYxLjQzMjNDMzEuNDEzNCA2MC44MjIgMzEuNzU2NiA2MC4yNjc0IDMyLjIxMTggNTkuODEyNUMzMi42NjcgNTkuMzU3NSAzMy4yMjE5IDU5LjAxNDYgMzMuODMyNSA1OC44MTA4QzM0LjQ0MzIgNTguNjA3IDM1LjA5MjggNTguNTQ3OCAzNS43MzAzIDU4LjYzODFINjMuNDE1QzY0LjA1MTggNTguNTQ3MiA2NC43MDExIDU4LjYwNTkgNjUuMzExMiA1OC44MDk3QzY1LjkyMTQgNTkuMDEzNiA2Ni40NzU1IDU5LjM1NjggNjYuOTI5NiA1OS44MTIzQzY3LjM4MzcgNjAuMjY3NyA2Ny43MjUyIDYwLjgyMjcgNjcuOTI3IDYxLjQzMzJDNjguMTI4OCA2Mi4wNDM3IDY4LjE4NTMgNjIuNjkyOSA2OC4wOTIxIDYzLjMyOTFWMTc1Ljg0NVpNMjcuMjk1MiAyMi41Mzc5QzI3LjE2MzMgMTkuNTUxMSAyNy42MzQ0IDE2LjU2ODQgMjguNjgwNCAxMy43Njc0QzI5LjcyNjQgMTAuOTY2NCAzMS4zMjU5IDguNDA0NTYgMzMuMzgzNSA2LjIzNDU0QzM3LjQ1MzQgMi4xMDEzIDQzLjAwNTYgMC4wMzQ2ODAyIDUwLjA0MDMgMC4wMzQ2ODAyQzUzLjA0MiAtMC4xMzY2MzMgNTYuMDQ2IDAuMzI4MTE1IDU4Ljg1NTMgMS4zOTg0MUM2MS42NjQ3IDIuNDY4NyA2NC4yMTYgNC4xMjAzNiA2Ni4zNDE5IDYuMjQ1MTVDNjguNDY3OSA4LjM2OTk0IDcwLjEyMDQgMTAuOTE5OSA3MS4xOTEzIDEzLjcyNzdDNzIuMjYyMiAxNi41MzU1IDcyLjcyNzIgMTkuNTM3OSA3Mi41NTU4IDIyLjUzNzlDNzIuNTU1OCAyOS41NTc4IDcwLjQ3MTYgMzUuMTE4IDY2LjMzNjEgMzkuMTY5M0M2NC4xNjkzIDQxLjIyODMgNjEuNjA5NSA0Mi44Mjk3IDU4LjgwOTcgNDMuODc4QzU2LjAwOTkgNDQuOTI2MyA1My4wMjc0IDQ1LjQgNTAuMDQwMyA0NS4yNzA3QzQyLjk5NDcgNDUuMjcwNyAzNy40NDI0IDQzLjIzNjkgMzMuMzgzNSAzOS4xNjkzQzI5LjMxMzcgMzUuMTE4IDI3LjI5NTIgMjkuNTU3OCAyNy4yOTUyIDIyLjUzNzlaIiBmaWxsPSIjQzIyOTI5Ii8+CjxwYXRoIGQ9Ik04MC4wNTUzIDExNy4yNDJDNzkuOTM4OCAxMDguNTM5IDgxLjkwODMgOTkuOTM0NiA4NS43OTkxIDkyLjE0NzdDODkuNjAxMiA4NC42ODg2IDk0LjkxNjMgNzguMTAyOCAxMDEuNDA2IDcyLjgxQzEwOC4xOTYgNjcuMjk5OCAxMTUuOTQ2IDYzLjA5MDUgMTI0LjI2NiA2MC4zOTM5QzE0Mi4zNCA1NC41OTg5IDE2MS43NzQgNTQuNTk4OSAxNzkuODQ4IDYwLjM5MzlDMTg4LjE3MyA2My4wOTA0IDE5NS45MjkgNjcuMjk5NiAyMDIuNzI1IDcyLjgxQzIwOS4yMDkgNzguMTAzNSAyMTQuNTE5IDg0LjY4OTMgMjE4LjMxNSA5Mi4xNDc3QzIyMi4wOTUgOTkuOTcwOCAyMjQuMDU5IDEwOC41NDYgMjI0LjA1OSAxMTcuMjM0QzIyNC4wNTkgMTI1LjkyMiAyMjIuMDk1IDEzNC40OTcgMjE4LjMxNSAxNDIuMzIxQzIxNC41MTkgMTQ5Ljc3OSAyMDkuMjA5IDE1Ni4zNjUgMjAyLjcyNSAxNjEuNjU4QzE5NS45MzMgMTY3LjE3NSAxODguMTc2IDE3MS4zODUgMTc5Ljg0OCAxNzQuMDc0QzE2MS43NzQgMTc5Ljg2OSAxNDIuMzQgMTc5Ljg2OSAxMjQuMjY2IDE3NC4wNzRDMTE1Ljk0MyAxNzEuMzg0IDEwOC4xOTIgMTY3LjE3NCAxMDEuNDA2IDE2MS42NThDOTQuOTE2MyAxNTYuMzY1IDg5LjYwMTIgMTQ5Ljc4IDg1Ljc5OTEgMTQyLjMyMUM4MS45MDY2IDEzNC41NCA3OS45MzcgMTI1Ljk0IDgwLjA1NTMgMTE3LjI0MlpNMTE4LjA0NiAxMTcuMjQyQzExOC4wNDYgMTI3LjU2NCAxMjAuOTc4IDEzNS44NDcgMTI2Ljg0MiAxNDIuMDkxQzEzMi43MDYgMTQ4LjMzNSAxNDEuMTE0IDE1MS40NTYgMTUyLjA2NSAxNTEuNDU2QzE2My4wMDYgMTUxLjQ1NiAxNzEuNDA4IDE0OC4zMzUgMTc3LjI3MiAxNDIuMDkxQzE4My4xMzYgMTM1Ljg0NyAxODYuMDY4IDEyNy41NjQgMTg2LjA2OCAxMTcuMjQyQzE4Ni4wNjggMTA2LjkzMSAxODMuMTM2IDk4LjY0ODMgMTc3LjI3MiA5Mi4zOTM3QzE3MS40MDggODYuMTM5MiAxNjMuMDA2IDgzLjAxMTkgMTUyLjA2NSA4My4wMTE5QzE0MS4xMjUgODMuMDExOSAxMzIuNzE3IDg2LjEzOTIgMTI2Ljg0MiA5Mi4zOTM3QzEyMC45NjcgOTguNjQ4MyAxMTguMDM1IDEwNi45MzEgMTE4LjA0NiAxMTcuMjQyWiIgZmlsbD0iI0MyMjkyOSIvPgo8cGF0aCBkPSJNMjc2LjYwNiAxNjcuODc0QzI3NS4yOTMgMTY2Ljk2OCAyNzMuNzM4IDE2Ni40NzcgMjcyLjE0MiAxNjYuNDY0QzI3MS4zMTIgMTY2LjQ1NSAyNzAuNDkgMTY2LjYxNiAyNjkuNzI1IDE2Ni45MzhDMjY4Ljk2IDE2Ny4yNiAyNjguMjY5IDE2Ny43MzUgMjY3LjY5NSAxNjguMzMzTDI2Ni4wNTQgMTY5Ljk3NEMyNjQuNzkgMTcxLjIzNiAyNjMuNDI4IDE3Mi41MTYgMjYxLjk1MSAxNzMuODQ0QzI2MC42NTggMTc1LjA5MyAyNTguOTQxIDE3NS44MDcgMjU3LjE0MyAxNzUuODQ1SDI0MC43MzJDMjM2LjgyNiAxNzUuODQ1IDIzNC44NzQgMTczLjg4OCAyMzQuODc0IDE2OS45NzRWMTYuNDM2N0MyMzQuNzgzIDE1Ljc5OTcgMjM0Ljg0MiAxNS4xNTA0IDIzNS4wNDYgMTQuNTRDMjM1LjI1IDEzLjkyOTcgMjM1LjU5MyAxMy4zNzUyIDIzNi4wNDkgMTIuOTIwMkMyMzYuNTA0IDEyLjQ2NTIgMjM3LjA1OSAxMi4xMjIzIDIzNy42NjkgMTEuOTE4NUMyMzguMjggMTEuNzE0NiAyMzguOTMgMTEuNjU1NiAyMzkuNTY3IDExLjc0NTlIMjY3LjIzNUMyNjcuODczIDExLjY1NTYgMjY4LjUyMyAxMS43MTQ2IDI2OS4xMzMgMTEuOTE4NUMyNjkuNzQ0IDEyLjEyMjMgMjcwLjI5OSAxMi40NjUyIDI3MC43NTQgMTIuOTIwMkMyNzEuMjA5IDEzLjM3NTIgMjcxLjU1MiAxMy45Mjk3IDI3MS43NTYgMTQuNTRDMjcxLjk2IDE1LjE1MDQgMjcyLjAxOSAxNS43OTk3IDI3MS45MjkgMTYuNDM2N1Y1NS44MDA5QzI3MS45NzkgNTguNjQxNyAyNzAuOTczIDYxLjQgMjY5LjEwNiA2My41NDI2TDI2MS44MzYgNzEuNzQzNUMyNjAuOTAxIDcyLjg0MjQgMjYwLjU4OSA3My43NzczIDI2MC45MDEgNzQuNTY0NkMyNjEuMTAxIDc0Ljk4NDYgMjYxLjM5NiA3NS4zNTE4IDI2MS43NjQgNzUuNjM2N0MyNjIuMTMyIDc1LjkyMTYgMjYyLjU2MSA3Ni4xMTYyIDI2My4wMTggNzYuMjA0OEMyNjMuODA3IDc2LjM1MDQgMjY0LjYyMiA3Ni4yNjQ5IDI2NS4zNjUgNzUuOTU4N0MyNjYuMjQ5IDc1LjU3NDEgMjY3LjA0NiA3NS4wMTY0IDI2Ny43MTEgNzQuMzE4NUMyNzMuMjU1IDY4LjQ5MTIgMjc5Ljk2NSA2My44OTczIDI4Ny40MDQgNjAuODM2M0MyOTUuNjc5IDU3LjUxOTQgMzA0LjUzMyA1NS44ODU2IDMxMy40NDggNTYuMDMwNkMzMjcuOTg4IDU2LjAzMDYgMzQwLjA2NiA1OS4wNDMxIDM0OS42ODMgNjUuMDY4QzM1OC43OSA3MC41NTQzIDM2Ni4yNzcgNzguMzU5NiAzNzEuMzc3IDg3LjY4NkMzNzYuMjE3IDk2Ljc2NTggMzc4LjY3OSAxMDYuOTIyIDM3OC41MzIgMTE3LjIwOUMzNzguNTMzIDEyNy40OTMgMzc2LjAzOCAxMzcuNjIzIDM3MS4yNjIgMTQ2LjczMkMzNjYuMjI2IDE1Ni4wOTYgMzU4Ljc1MyAxNjMuOTI4IDM0OS42MzMgMTY5LjRDMzM5LjkyOSAxNzUuNDE0IDMyNy44OTUgMTc4LjQyIDMxMy41MyAxNzguNDJDMjk5LjE2NSAxNzguNDIgMjg2Ljg1NyAxNzQuOTA1IDI3Ni42MDYgMTY3Ljg3NFpNMzA2LjE0NSAxNTEuNDcyQzMxMi44NzEgMTUxLjcyNyAzMTkuNTIxIDE0OS45NzQgMzI1LjI0NyAxNDYuNDM3QzMzMC4xMjYgMTQzLjMwMiAzMzQuMDg5IDEzOC45MzQgMzM2LjczNSAxMzMuNzc1QzMzOS4yNzIgMTI4LjYzNSAzNDAuNTkxIDEyMi45ODEgMzQwLjU5MSAxMTcuMjVDMzQwLjU5MSAxMTEuNTE5IDMzOS4yNzIgMTA1Ljg2NSAzMzYuNzM1IDEwMC43MjVDMzM0LjA4NCA5NS41Njk1IDMzMC4xMjIgOTEuMjAyNCAzMjUuMjQ3IDg4LjA2MzJDMzE5LjUxOCA4NC41MzMzIDMxMi44NzEgODIuNzgwOSAzMDYuMTQ1IDgzLjAyNzlDMjk1LjgyOCA4My4wMjc5IDI4Ny41NDEgODYuMTU1MiAyODEuMjgzIDkyLjQwOTdDMjc1LjAyNSA5OC42NjQzIDI3MS44OTYgMTA2Ljk0NyAyNzEuODk2IDExNy4yNThDMjcxLjg5NiAxMjcuNTggMjc1LjAyNSAxMzUuODYzIDI4MS4yODMgMTQyLjEwN0MyODcuNTQxIDE0OC4zNTEgMjk1LjgzNCAxNTEuNDY3IDMwNi4xNjEgMTUxLjQ1NkwzMDYuMTQ1IDE1MS40NzJaIiBmaWxsPSIjQzIyOTI5Ii8+CjxwYXRoIGQ9Ik00MzEuMTYxIDE2Ny44NzRDNDI5Ljg1NCAxNjYuOTY5IDQyOC4zMDQgMTY2LjQ3NyA0MjYuNzE0IDE2Ni40NjRDNDI1Ljg4MiAxNjYuNDU1IDQyNS4wNTYgMTY2LjYxNiA0MjQuMjg5IDE2Ni45MzdDNDIzLjUyMSAxNjcuMjU5IDQyMi44MjggMTY3LjczNCA0MjIuMjUgMTY4LjMzM0w0MjAuNjA5IDE2OS45NzRDNDE5LjM2MiAxNzEuMjM2IDQxNy45ODQgMTcyLjUxNiA0MTYuNTA3IDE3My44NDRDNDE1LjIxNSAxNzUuMDk2IDQxMy40OTcgMTc1LjgxMSA0MTEuNjk4IDE3NS44NDVIMzk1LjI4OEMzOTEuMzgyIDE3NS44NDUgMzg5LjQyOSAxNzMuODg4IDM4OS40MjkgMTY5Ljk3NFYxNi40MzY3QzM4OS4zMzkgMTUuNzk5NyAzODkuMzk4IDE1LjE1MDQgMzg5LjYwMiAxNC41NEMzODkuODA2IDEzLjkyOTcgMzkwLjE0OSAxMy4zNzUyIDM5MC42MDQgMTIuOTIwMkMzOTEuMDU5IDEyLjQ2NTIgMzkxLjYxNCAxMi4xMjIzIDM5Mi4yMjUgMTEuOTE4NUMzOTIuODM1IDExLjcxNDYgMzkzLjQ4NSAxMS42NTU2IDM5NC4xMjIgMTEuNzQ1OUg0MjEuODRDNDIyLjQ3NyAxMS42NTU2IDQyMy4xMjcgMTEuNzE0NiA0MjMuNzM4IDExLjkxODVDNDI0LjM0OCAxMi4xMjIzIDQyNC45MDMgMTIuNDY1MiA0MjUuMzU5IDEyLjkyMDJDNDI1LjgxNCAxMy4zNzUyIDQyNi4xNTcgMTMuOTI5NyA0MjYuMzYxIDE0LjU0QzQyNi41NjUgMTUuMTUwNCA0MjYuNjI0IDE1Ljc5OTcgNDI2LjUzMyAxNi40MzY3VjU1LjgwMDlDNDI2LjU4OCA1OC42Mzk1IDQyNS41ODggNjEuMzk3NiA0MjMuNzI3IDYzLjU0MjZMNDE2LjQ1NyA3MS43NDM1QzQxNS41MjIgNzIuODQyNCA0MTUuMTk0IDczLjc3NzMgNDE1LjUyMiA3NC41NjQ2QzQxNS43MTggNzQuOTg0MiA0MTYuMDEgNzUuMzUxNCA0MTYuMzc1IDc1LjYzNjVDNDE2Ljc0IDc1LjkyMTUgNDE3LjE2OCA3Ni4xMTYzIDQxNy42MjMgNzYuMjA0OEM0MTguNDEyIDc2LjM1MTMgNDE5LjIyNyA3Ni4yNjU4IDQxOS45NjkgNzUuOTU4N0M0MjAuODU2IDc1LjU3ODQgNDIxLjY1NCA3NS4wMjAyIDQyMi4zMTYgNzQuMzE4NUM0MjcuODYxIDY4LjQ5MjggNDM0LjU3IDYzLjg5OSA0NDIuMDA5IDYwLjgzNjNDNDUwLjI3OCA1Ny41MTgyIDQ1OS4xMjcgNTUuODg0MyA0NjguMDM2IDU2LjAzMDZDNDgyLjU3NiA1Ni4wMzA2IDQ5NC42NTQgNTkuMDQzMSA1MDQuMjcxIDY1LjA2OEM1MTMuMzgyIDcwLjU0OTkgNTIwLjg3IDc4LjM1NjQgNTI1Ljk2NiA4Ny42ODZDNTMwLjgxNiA5Ni43NjE3IDUzMy4yNzggMTA2LjkyMSA1MzMuMTIxIDExNy4yMDlDNTMzLjEyMSAxMjcuNDkzIDUzMC42MjYgMTM3LjYyMyA1MjUuODUxIDE0Ni43MzJDNTIwLjggMTU2LjA5OSA1MTMuMzAyIDE2My45MjEgNTA0LjE1NiAxNjkuMzY3QzQ5NC40NjMgMTc1LjM4MSA0ODIuNDI4IDE3OC4zODggNDY4LjA1MiAxNzguMzg4QzQ1My42NzcgMTc4LjM4OCA0NDEuMzggMTc0Ljg4MyA0MzEuMTYxIDE2Ny44NzRaTTQ2MC43IDE1MS40NzJDNDY3LjQzMiAxNTEuNzI4IDQ3NC4wODcgMTQ5Ljk3NSA0NzkuODE5IDE0Ni40MzdDNDg0LjY5NSAxNDMuMjk5IDQ4OC42NTggMTM4LjkzMiA0OTEuMzA2IDEzMy43NzVDNDkzLjg1MyAxMjguNjM4IDQ5NS4xNzggMTIyLjk4MyA0OTUuMTc4IDExNy4yNUM0OTUuMTc4IDExMS41MTcgNDkzLjg1MyAxMDUuODYyIDQ5MS4zMDYgMTAwLjcyNUM0ODguNjUyIDk1LjU3MjIgNDg0LjY5MSA5MS4yMDU5IDQ3OS44MTkgODguMDYzMkM0NzQuMDg0IDg0LjUzMjkgNDY3LjQzMSA4Mi43ODA2IDQ2MC43IDgzLjAyNzlDNDUwLjM3MyA4My4wMjc5IDQ0Mi4wODUgODYuMTU1MiA0MzUuODM4IDkyLjQwOTdDNDI5LjU5MSA5OC42NjQzIDQyNi40NjIgMTA2Ljk0NyA0MjYuNDUxIDExNy4yNThDNDI2LjQ1MSAxMjcuNTggNDI5LjU4IDEzNS44NjMgNDM1LjgzOCAxNDIuMTA3QzQ0Mi4wOTYgMTQ4LjM1MSA0NTAuMzg5IDE1MS40NjcgNDYwLjcxNyAxNTEuNDU2TDQ2MC43IDE1MS40NzJaIiBmaWxsPSIjQzIyOTI5Ii8+CjxwYXRoIGQ9Ik01ODMuNzE1IDExNS4zODlWMjAuNjUyMkM1ODMuNzE1IDE2Ljc0ODYgNTgyLjA3NCAxNC43OTY3IDU3OS4wMjEgMTQuNzk2N0g1NTEuMzUzQzU0OC4yMjQgMTQuNzk2NyA1NDYuNjU5IDE2Ljc0ODYgNTQ2LjY1OSAyMC42NTIyVjExNS4zODlINTgzLjcxNVoiIGZpbGw9IiNDMjI5MjkiLz4KPHBhdGggZD0iTTYxNC44MTMgODUuNTg3MUM2MTQuODk4IDg0Ljk4MjEgNjE0Ljg0MSA4NC4zNjU1IDYxNC42NDcgODMuNzg2M0M2MTQuNDUyIDgzLjIwNyA2MTQuMTI1IDgyLjY4MDkgNjEzLjY5MiA4Mi4yNDk2QzYxMy4yNTkgODEuODE4MyA2MTIuNzMyIDgxLjQ5MzggNjEyLjE1MSA4MS4zMDE2QzYxMS41NzEgODEuMTA5NCA2MTAuOTU0IDgxLjA1NDkgNjEwLjM0OSA4MS4xNDIzSDYwMi4xNDRDNTk4LjY5NyA4MS4xNDIzIDU5Ni45NzQgNzkuNDIwMSA1OTYuOTc0IDc1Ljk3NTdWNjMuNzg5MkM1OTYuOTc0IDYwLjM2NjcgNTk4LjY5NyA1OC42NSA2MDIuMTQ0IDU4LjYzOUM2MDQuMzQxIDU4LjY3MTggNjA2LjUzOCA1OC41MTI3IDYwOC43MDggNTguMTYzNEM2MTAuMjkgNTcuOTAwOSA2MTEuODMgNTcuNDI2NSA2MTMuMjg2IDU2Ljc1MjlDNjE0LjYzIDU2LjEwNzcgNjE1LjgyNiA1NS4xOTE5IDYxNi43OTggNTQuMDYyOUM2MTcuODE2IDUyLjg5ODQgNjE4Ljk0OCA1MS41MjA3IDYyMC4xOTUgNDkuOTYyNUw2MjcuNDY1IDQwLjU4MDdDNjI4LjI4NCAzOS40NTY1IDYyOS4xODkgMzguMzk4MSA2MzAuMTczIDM3LjQxNTJDNjMwLjY0IDM2LjkyNTMgNjMxLjIwMyAzNi41MzcxIDYzMS44MjcgMzYuMjc0NkM2MzIuNDUxIDM2LjAxMjIgNjMzLjEyMyAzNS44ODEyIDYzMy44IDM1Ljg4OThINjQ3LjE3NEM2NDcuODEyIDM1Ljc5OTUgNjQ4LjQ2MSAzNS44NTg2IDY0OS4wNzIgMzYuMDYyNEM2NDkuNjgzIDM2LjI2NjIgNjUwLjIzOCAzNi42MDkyIDY1MC42OTMgMzcuMDY0MUM2NTEuMTQ4IDM3LjUxOTEgNjUxLjQ5MSAzOC4wNzM3IDY1MS42OTUgMzguNjg0QzY1MS44OTkgMzkuMjk0MyA2NTEuOTU4IDM5Ljk0MzYgNjUxLjg2OCA0MC41ODA3VjU0LjE3NzhDNjUxLjc4IDU0Ljc4MjUgNjUxLjgzNSA1NS4zOTkzIDY1Mi4wMjcgNTUuOTc5M0M2NTIuMjE5IDU2LjU1OTMgNjUyLjU0NCA1Ny4wODY2IDY1Mi45NzYgNTcuNTE5NEM2NTMuNDA3IDU3Ljk1MjMgNjUzLjkzNCA1OC4yNzg4IDY1NC41MTMgNTguNDczMUM2NTUuMDkzIDU4LjY2NzQgNjU1LjcxIDU4LjcyNDMgNjU2LjMxNSA1OC42MzlINjcwLjE0OUM2NzMuNTk1IDU4LjYzOSA2NzUuMzE5IDYwLjM1NTggNjc1LjMxOSA2My43ODkyVjc1Ljk3NTdDNjc1LjMxOSA3OS40MjAxIDY3My41OTUgODEuMTQyMyA2NzAuMTQ5IDgxLjE0MjNINjM1LjY4N0M2MzUuMzMzIDgxLjA5NyA2MzQuOTczIDgxLjEzMTUgNjM0LjYzMyA4MS4yNDMyQzYzNC4yOTQgODEuMzU0OSA2MzMuOTg0IDgxLjU0MDkgNjMzLjcyNiA4MS43ODc4QzYzMy40NjggODIuMDM0NiA2MzMuMjY5IDgyLjMzNiA2MzMuMTQyIDgyLjY2OThDNjMzLjAxNiA4My4wMDM3IDYzMi45NjYgODMuMzYxNiA2MzIuOTk2IDgzLjcxNzNDNjMyLjk5NiA4NS4zNTc1IDYzMy44MTYgODYuMjkyNCA2MzUuNjg3IDg2LjI5MjRINjQyLjQ5N0M2NDMuNzQ5IDg2LjIxODQgNjQ1LjAwMyA4Ni40MTA0IDY0Ni4xNzUgODYuODU1N0M2NDcuMzQ4IDg3LjMwMSA2NDguNDEyIDg3Ljk4OTUgNjQ5LjI5OSA4OC44NzU5QzY1MC4xODYgODkuNzYyMyA2NTAuODc1IDkwLjgyNjQgNjUxLjMyMSA5MS45OTgxQzY1MS43NjYgOTMuMTY5OSA2NTEuOTU4IDk0LjQyMjkgNjUxLjg4NCA5NS42NzQyVjEyOC43MjRDNjUxLjgwNiAxMzIuNjAyIDY1Mi4wNDIgMTM2LjQ4IDY1Mi41OSAxNDAuMzJDNjUyLjc4MiAxNDIuNDA2IDY1My41NDkgMTQ0LjM5OSA2NTQuODA1IDE0Ni4wNzdDNjU1LjI3NyAxNDYuNjA0IDY1NS44NTcgMTQ3LjAyMyA2NTYuNTA1IDE0Ny4zMDdDNjU3LjE1NCAxNDcuNTkgNjU3Ljg1NiAxNDcuNzMgNjU4LjU2MyAxNDcuNzE3QzY2MC4zMzQgMTQ3LjY4OSA2NjIuMSAxNDcuNTMgNjYzLjg0OCAxNDcuMjQxQzY2Ny4yNzIgMTQ2Ljc2IDY2OS4yMjUgMTQ4LjA4OSA2NjkuNzA2IDE1MS4yMjdMNjcyLjUxMiAxNzMuMDI1QzY3Mi45ODggMTc2LjYxNyA2NzEuNDk1IDE3OC40MjEgNjY4LjA2NSAxNzguNDIxQzY2NS43MTggMTc4LjQyMSA2NjIuNzQ4IDE3OC40MjEgNjU5LjE1NCAxNzguMzA2QzY1NS4zMzkgMTc4LjIwMyA2NTEuNTM3IDE3Ny44MDggNjQ3Ljc4MiAxNzcuMTI1QzY0My43MTQgMTc2LjQgNjM5LjczOSAxNzUuMjIzIDYzNS45MzMgMTczLjYxNUM2MzEuOTQgMTcxLjkxNiA2MjguMzQ2IDE2OS40MDIgNjI1LjM4MSAxNjYuMjM0QzYyMi4wMjkgMTYyLjYgNjE5LjQzNSAxNTguMzM1IDYxNy43NSAxNTMuNjg3QzYxNS42MjggMTQ3LjU0NyA2MTQuNjM4IDE0MS4wNzMgNjE0LjgyOSAxMzQuNTc5TDYxNC44MTMgODUuNTg3MVoiIGZpbGw9IiNDMjI5MjkiLz4KPHBhdGggZD0iTTU4Ny44MTcgMTUzLjM0M0M1ODcuODE3IDE0Ni42MDEgNTg1LjkxNCAxNDEuMTg5IDU4Mi4wNTcgMTM3LjE4N0M1ODEuOTEzIDEzNy4wMiA1ODEuNzU5IDEzNi44NjIgNTgxLjU5OCAxMzYuNzExQzU3OS45NDcgMTM1LjA3MyA1NzguMDE5IDEzMy43NDEgNTc1LjkwMyAxMzIuNzc1QzU3NS4yOTcgMTMyLjQ3OCA1NzQuNjcyIDEzMi4yMjEgNTc0LjAzMiAxMzIuMDA0QzU3MS4yMjQgMTMxLjA0IDU2OC4yNzEgMTMwLjU2OSA1NjUuMzAyIDEzMC42MUM1NjIuMjI2IDEzMC41NjMgNTU5LjE2MyAxMzEuMDM0IDU1Ni4yNDMgMTMyLjAwNEM1NTUuNTc4IDEzMi4yMjkgNTU0LjkyNiAxMzIuNDkyIDU1NC4yOSAxMzIuNzkxQzU1Mi4xODkgMTMzLjc0OSA1NTAuMjc3IDEzNS4wNzcgNTQ4LjY0NSAxMzYuNzExQzU0OC40ODQgMTM2Ljg2MiA1NDguMzMgMTM3LjAyIDU0OC4xODYgMTM3LjE4N0M1NDQuNDI4IDE0MS4xODkgNTQyLjU1NyAxNDYuNjAxIDU0Mi41NTcgMTUzLjM0M0M1NDIuNDI1IDE1Ni4zMjkgNTQyLjg5NiAxNTkuMzEyIDU0My45NDIgMTYyLjExM0M1NDQuOTg4IDE2NC45MTQgNTQ2LjU4OCAxNjcuNDc2IDU0OC42NDUgMTY5LjY0NkM1NTIuNzE1IDE3My43NzkgNTU4LjI2NyAxNzUuODQ2IDU2NS4zMDIgMTc1Ljg0NkM1NjguMzA0IDE3Ni4wMTcgNTcxLjMwOCAxNzUuNTUyIDU3NC4xMTcgMTc0LjQ4MkM1NzYuOTI2IDE3My40MTIgNTc5LjQ3OCAxNzEuNzYgNTgxLjYwNCAxNjkuNjM1QzU4My43MjkgMTY3LjUxMSA1ODUuMzgyIDE2NC45NjEgNTg2LjQ1MyAxNjIuMTUzQzU4Ny41MjQgMTU5LjM0NSA1ODcuOTg5IDE1Ni4zNDMgNTg3LjgxNyAxNTMuMzQzWiIgZmlsbD0iI0MyMjkyOSIvPgo8cGF0aCBkPSJNNjk1Ljk5NiA0Ny45NzczQzY5Ni4wNDkgNDkuODQ3NyA2OTUuNTQxIDUxLjY5MTIgNjk0LjUzOCA1My4yNzE2QzY5My41MzYgNTQuODUyIDY5Mi4wODQgNTYuMDk3NCA2OTAuMzcgNTYuODQ4MkM2ODguNjU1IDU3LjU5ODkgNjg2Ljc1NSA1Ny44MjEgNjg0LjkxMyA1Ny40ODU5QzY4My4wNzEgNTcuMTUwOCA2ODEuMzcxIDU2LjI3MzcgNjgwLjAzMSA1NC45NjcxQzY3OC42OSA1My42NjA1IDY3Ny43NzEgNTEuOTgzOCA2NzcuMzkgNTAuMTUxN0M2NzcuMDA5IDQ4LjMxOTYgNjc3LjE4NCA0Ni40MTU2IDY3Ny44OTIgNDQuNjgzNUM2NzguNjAxIDQyLjk1MTUgNjc5LjgxMSA0MS40NzAyIDY4MS4zNjYgNDAuNDI5NEM2ODIuOTIyIDM5LjM4ODYgNjg0Ljc1NCAzOC44MzU3IDY4Ni42MjYgMzguODQxNUM2ODcuODQ0IDM4LjgxNTMgNjg5LjA1NiAzOS4wMzIxIDY5MC4xODkgMzkuNDc5MUM2OTEuMzIzIDM5LjkyNiA2OTIuMzU2IDQwLjU5NDMgNjkzLjIyOCA0MS40NDQ4QzY5NC4xMDEgNDIuMjk1NCA2OTQuNzk1IDQzLjMxMTEgNjk1LjI3IDQ0LjQzMjdDNjk1Ljc0NSA0NS41NTQzIDY5NS45OTIgNDYuNzU5MiA2OTUuOTk2IDQ3Ljk3NzNaTTY3OS41ODYgNDcuOTc3M0M2NzkuNTU1IDQ4LjkzMDMgNjc5LjcxNyA0OS44Nzk3IDY4MC4wNjIgNTAuNzY4NUM2ODAuNDA4IDUxLjY1NzIgNjgwLjkzIDUyLjQ2NjkgNjgxLjU5NyA1My4xNDg3QzY4Mi4yNjQgNTMuODMwNiA2ODMuMDYyIDU0LjM3MDYgNjgzLjk0MyA1NC43MzYyQzY4NC44MjQgNTUuMTAxNyA2ODUuNzcgNTUuMjg1NCA2ODYuNzI0IDU1LjI3NkM2ODguNjYxIDU1LjI3NiA2OTAuNTE5IDU0LjUwNzEgNjkxLjg4OCA1My4xMzgzQzY5My4yNTggNTEuNzY5NSA2OTQuMDI3IDQ5LjkxMyA2OTQuMDI3IDQ3Ljk3NzNDNjk0LjAyNyA0Ni4wNDE1IDY5My4yNTggNDQuMTg1IDY5MS44ODggNDIuODE2MkM2OTAuNTE5IDQxLjQ0NzQgNjg4LjY2MSA0MC42Nzg1IDY4Ni43MjQgNDAuNjc4NUM2ODUuNzYzIDQwLjY1OCA2ODQuODA3IDQwLjgzMzMgNjgzLjkxNSA0MS4xOTM3QzY4My4wMjQgNDEuNTU0MSA2ODIuMjE1IDQyLjA5MjEgNjgxLjUzOCA0Mi43NzQ5QzY4MC44NjEgNDMuNDU3NyA2ODAuMzMgNDQuMjcxIDY3OS45NzcgNDUuMTY1NEM2NzkuNjI1IDQ2LjA1OTcgNjc5LjQ1OCA0Ny4wMTY0IDY3OS40ODcgNDcuOTc3M0g2NzkuNTg2Wk02ODUuMjE0IDUyLjc2NjZINjgzLjA5OFY0My42MzA4QzY4NC4yNTcgNDMuNDI3OSA2ODUuNDMzIDQzLjMzNDUgNjg2LjYwOSA0My4zNTE5QzY4Ny43MDggNDMuMjU5MyA2ODguODEgNDMuNDkzMiA2ODkuNzc3IDQ0LjAyNDRDNjkwLjA2OCA0NC4yNjg2IDY5MC4zIDQ0LjU3NTQgNjkwLjQ1NyA0NC45MjE4QzY5MC42MTMgNDUuMjY4MyA2OTAuNjg5IDQ1LjY0NTUgNjkwLjY3OSA0Ni4wMjU0QzY5MC42MzggNDYuNTM3OSA2OTAuNDI5IDQ3LjAyMjUgNjkwLjA4NSA0Ny40MDQ4QzY4OS43NDEgNDcuNzg3MSA2ODkuMjgxIDQ4LjA0NTkgNjg4Ljc3NiA0OC4xNDEzVjQ4LjI1NjFDNjg5LjIyNiA0OC40NDQzIDY4OS42MTYgNDguNzUxMyA2ODkuOTA1IDQ5LjE0NDJDNjkwLjE5NCA0OS41MzcxIDY5MC4zNzEgNTAuMDAxMSA2OTAuNDE3IDUwLjQ4NjdDNjkwLjUwNiA1MS4yODAyIDY5MC43MzMgNTIuMDUxOCA2OTEuMDg5IDUyLjc2NjZINjg4LjgwOEM2ODguNDUxIDUyLjA2NDcgNjg4LjIwMiA1MS4zMTI2IDY4OC4wNyA1MC41MzU5QzY4Ny45MDYgNDkuNTM1NCA2ODcuMzQ4IDQ5LjA5MjYgNjg2LjE4MyA0OS4wOTI2SDY4NS4xODJMNjg1LjIxNCA1Mi43NjY2Wk02ODUuMjE0IDQ3LjU4MzZINjg2LjIxNUM2ODcuMzk3IDQ3LjU4MzYgNjg4LjMzMyA0Ny4xOSA2ODguMzMzIDQ2LjI1NTFDNjg4LjMzMyA0NS4zMjAyIDY4Ny43MjUgNDQuODYwOSA2ODYuMzk2IDQ0Ljg2MDlDNjg1Ljk5OSA0NC44NDg3IDY4NS42MDIgNDQuODg3MyA2ODUuMjE0IDQ0Ljk3NThWNDcuNTgzNloiIGZpbGw9IiNDMjI5MjkiLz4KPC9zdmc+Cg==\")";

export interface BadgeOptions {
  enabled?: boolean;
  tier?: string;
  appUrl?: string;
  expiresAt?: string;
  variant?: "free-host" | "compact" | string;
  mount?: HTMLElement;
}

function isEnabled(value?: string): boolean {
  return value === "1" || value === "true" || value === "yes";
}

function daysUntil(expiresAt?: string): string {
  if (!expiresAt) return "7 days";
  const time = new Date(expiresAt).getTime();
  if (!Number.isFinite(time)) return "7 days";
  const days = Math.max(0, Math.ceil((time - Date.now()) / 86_400_000));
  return `${days} day${days === 1 ? "" : "s"}`;
}

function ensureStyles() {
  if (document.querySelector("style[data-jobbit-badge-style]")) return;
  const style = document.createElement("style");
  style.dataset.jobbitBadgeStyle = "true";
  style.textContent = `
    [data-jobbit-badge] {
      --jb-bg: #0a0a0a;
      --jb-fg: #fff;
      --jb-muted: rgba(255,255,255,.64);
      --jb-subtle: rgba(255,255,255,.78);
      --jb-border: rgba(255,255,255,.16);
      --jb-panel: rgba(17, 17, 17, .98);
      position: fixed;
      right: max(18px, env(safe-area-inset-right));
      bottom: max(18px, env(safe-area-inset-bottom));
      z-index: 2147483000;
      color: var(--jb-fg);
      font: 500 13px/1.2 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      pointer-events: none;
    }
    [data-jobbit-badge],
    [data-jobbit-badge] * {
      box-sizing: border-box;
      min-width: 0;
    }
    [data-jobbit-badge] .jb-chip-wrap {
      position: relative;
      z-index: 3;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      pointer-events: auto;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 14px;
      background: var(--jb-panel);
      box-shadow: 0 18px 50px rgba(0,0,0,.32), 0 1px 0 rgba(255,255,255,.06) inset;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      padding: 5px;
    }
    [data-jobbit-badge] .jb-chip,
    [data-jobbit-badge] .jb-dismiss {
      appearance: none;
      border: 0;
      color: inherit;
      font: inherit;
      letter-spacing: 0;
      cursor: pointer;
    }
    [data-jobbit-badge] .jb-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      height: 32px;
      border-radius: 10px;
      padding: 0 7px 0 11px;
      background: transparent;
      color: rgba(255,255,255,.82);
      font-size: 13px;
      font-weight: 610;
      line-height: 1;
      white-space: nowrap;
    }
    [data-jobbit-badge] .jb-chip:hover,
    [data-jobbit-badge][data-open="true"] .jb-chip {
      background: rgba(255,255,255,.075);
      color: #fff;
    }
    [data-jobbit-badge] .jb-logo,
    [data-jobbit-badge] .jb-pop-logo {
      display: inline-block;
      flex: 0 0 auto;
      background: currentColor;
      -webkit-mask-image: ${JOBBIT_LOGO_MASK};
      mask-image: ${JOBBIT_LOGO_MASK};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      -webkit-mask-position: center;
      mask-position: center;
      -webkit-mask-size: contain;
      mask-size: contain;
    }
    [data-jobbit-badge] .jb-logo {
      width: 58px;
      height: 19px;
      color: #fff;
    }
    [data-jobbit-badge] .jb-dismiss {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: transparent;
      color: rgba(255,255,255,.62);
      font-size: 20px;
      line-height: 1;
    }
    [data-jobbit-badge] .jb-dismiss:hover {
      background: rgba(255,255,255,.075);
      color: #fff;
    }
    [data-jobbit-badge] .jb-popover {
      position: absolute;
      z-index: 2;
      right: 0;
      bottom: calc(100% + 10px);
      width: min(342px, calc(100vw - 32px));
      padding: 16px;
      pointer-events: auto;
      border: 1px solid rgba(255,255,255,.18);
      border-radius: 18px;
      background: var(--jb-panel);
      box-shadow: 0 24px 80px rgba(0,0,0,.62), 0 1px 0 rgba(255,255,255,.08) inset;
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      transform: translateY(4px) scale(.98);
      transform-origin: right bottom;
      opacity: 0;
      visibility: hidden;
      transition: opacity .16s ease, transform .16s ease, visibility .16s ease;
    }
    [data-jobbit-badge][data-open="true"] .jb-popover {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    [data-jobbit-badge] .jb-pop-head {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 14px;
    }
    [data-jobbit-badge] .jb-pop-kicker {
      color: rgba(255,255,255,.54);
      font-size: 12px;
      font-weight: 650;
      margin-bottom: 4px;
    }
    [data-jobbit-badge] .jb-pop-title {
      color: #fff;
      font-size: 16px;
      font-weight: 760;
      line-height: 1.22;
    }
    [data-jobbit-badge] .jb-pop-logo {
      width: 72px;
      height: 24px;
      margin-top: 1px;
      color: #fff;
    }
    [data-jobbit-badge] .jb-pop-text {
      margin: 0 0 13px;
      color: rgba(255,255,255,.7);
      font-size: 13px;
      line-height: 1.45;
    }
    [data-jobbit-badge] .jb-pop-text b {
      color: #fff;
      font-weight: 760;
    }
    [data-jobbit-badge] .jb-benefits {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin: 0 0 15px;
      padding: 0;
      list-style: none;
    }
    [data-jobbit-badge] .jb-benefits li {
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 999px;
      padding: 5px 9px;
      color: rgba(255,255,255,.68);
      background: rgba(255,255,255,.045);
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
    }
    [data-jobbit-badge] .jb-upgrade {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      width: 100%;
      min-height: 38px;
      border: 1px solid rgba(255,255,255,.84);
      border-radius: 12px;
      padding: 0 13px;
      background: #fff;
      color: #090909;
      font-size: 13px;
      font-weight: 720;
      line-height: 1;
      white-space: nowrap;
      text-decoration: none;
      box-shadow: 0 1px 0 rgba(255,255,255,.22) inset;
      transition: transform .15s ease, background .15s ease, border-color .15s ease;
    }
    [data-jobbit-badge] .jb-upgrade:hover {
      border-color: #fff;
      background: rgba(255,255,255,.92);
      transform: translateY(-1px);
    }
    [data-jobbit-badge] .jb-upgrade-icon {
      font-size: 13px;
      line-height: 1;
      transform: translateY(-.5px);
    }
    @media (max-width: 520px) {
      [data-jobbit-badge] {
        right: max(12px, env(safe-area-inset-right));
        bottom: max(12px, env(safe-area-inset-bottom));
      }
      [data-jobbit-badge] .jb-chip-wrap {
        border-radius: 13px;
      }
      [data-jobbit-badge] .jb-chip {
        height: 31px;
        max-width: calc(100vw - 70px);
        padding-left: 9px;
        font-size: 12.5px;
      }
      [data-jobbit-badge] .jb-chip-label {
        max-width: 92px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [data-jobbit-badge] .jb-logo {
        width: 53px;
        height: 18px;
      }
      [data-jobbit-badge] .jb-dismiss {
        width: 31px;
        height: 31px;
      }
      [data-jobbit-badge] .jb-popover {
        right: 0;
        width: calc(100vw - 24px);
      }
    }
  `;
  document.head.appendChild(style);
}

export function shouldShowJobbitBadge(options: BadgeOptions = {}): boolean {
  const enabled = options.enabled ?? isEnabled(publicEnv("NEXT_PUBLIC_JOBBIT_BADGE_ENABLED"));
  const tier = options.tier ?? publicEnv("NEXT_PUBLIC_JOBBIT_APP_TIER") ?? "free";
  return Boolean(enabled && tier === "free");
}

export function mountJobbitBadge(options: BadgeOptions = {}): HTMLElement | null {
  if (typeof document === "undefined" || !shouldShowJobbitBadge(options)) return null;
  if (document.documentElement.dataset.jobbitBadgeDismissed === "true") return null;
  const root = options.mount ?? document.body;
  const existing = document.querySelector<HTMLElement>("[data-jobbit-badge]");
  if (existing) return existing;
  ensureStyles();

  const badge = document.createElement("div");
  badge.dataset.jobbitBadge = "true";
  badge.dataset.open = "false";
  badge.dataset.variant = options.variant ?? publicEnv("NEXT_PUBLIC_JOBBIT_BADGE_VARIANT") ?? "free-host";

  const appId = publicEnv("NEXT_PUBLIC_JOBBIT_APP_ID");
  const plansUrl = appId ? `https://jobbit.uk/deploys/${encodeURIComponent(appId)}/plans` : "https://jobbit.uk";
  const expiresAt = options.expiresAt ?? publicEnv("NEXT_PUBLIC_JOBBIT_FREE_HOST_EXPIRES_AT");
  const expiryText = daysUntil(expiresAt);
  badge.innerHTML = `
    <div class="jb-popover" role="dialog" aria-label="Jobbit hosting notice">
      <div class="jb-pop-head">
        <div>
          <div class="jb-pop-kicker">Hosted by</div>
          <div class="jb-pop-title">Free host expires in ${expiryText}</div>
        </div>
        <span class="jb-pop-logo" role="img" aria-label="Jobbit"></span>
      </div>
      <p class="jb-pop-text">This app is running on a temporary free Jobbit host. Upgrade to keep it online, attach a custom domain, and remove the free-host notice.</p>
      <ul class="jb-benefits" aria-label="Upgrade benefits">
        <li>Custom domain</li>
        <li>No expiry</li>
        <li>Priority support</li>
      </ul>
      <a class="jb-upgrade" href="${plansUrl}" target="_blank" rel="noopener noreferrer"><span class="jb-upgrade-label">Upgrade plan</span><span class="jb-upgrade-icon" aria-hidden="true">→</span></a>
    </div>
    <div class="jb-chip-wrap">
      <button class="jb-chip" type="button" aria-expanded="false">
        <span class="jb-chip-label">Hosted by</span>
        <span class="jb-logo" role="img" aria-label="Jobbit"></span>
      </button>
      <button class="jb-dismiss" type="button" aria-label="Hide Jobbit badge for this session">×</button>
    </div>
  `;

  const chip = badge.querySelector<HTMLButtonElement>(".jb-chip");
  const dismiss = badge.querySelector<HTMLButtonElement>(".jb-dismiss");

  const setOpen = (open: boolean) => {
    badge.dataset.open = open ? "true" : "false";
    chip?.setAttribute("aria-expanded", open ? "true" : "false");
  };

  chip?.addEventListener("click", () => {
    setOpen(badge.dataset.open !== "true");
  });
  dismiss?.addEventListener("click", (event) => {
    event.stopPropagation();
    document.documentElement.dataset.jobbitBadgeDismissed = "true";
    badge.remove();
  });
  document.addEventListener("click", (event) => {
    if (badge.dataset.open !== "true") return;
    if (event.target instanceof Node && badge.contains(event.target)) return;
    setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  root.appendChild(badge);
  return badge;
}
