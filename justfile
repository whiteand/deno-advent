default:
    just --list

generate year day:
    @mkdir ./y{{year}}/d{{day}}
    @echo "" > ./y{{year}}/d{{day}}/example.txt
    @cp -r ./year/day/part ./y{{year}}/d{{day}}/part1
    @cp -r ./year/day/part ./y{{year}}/d{{day}}/part2
    @nu fetch.nu 20{{year}} {{day}};
    @cat ./y{{year}}/d{{day}}/input.txt
    cd ./y{{year}}/d{{day}}/part1 && deno run --watch --allow-read main.ts ../example.txt

fetch year day:
    nu fetch.nu 20{{year}} {{day}};

run-p1 year day:
    cd ./y{{year}}/d{{day}}/part1 && deno run --allow-read main.ts ../input.txt
run-p1-example year day:
    cd ./y{{year}}/d{{day}}/part1 && deno run --watch --allow-read main.ts ../example.txt
run-p2 year day:
    cd ./y{{year}}/d{{day}}/part2 && deno run --allow-read main.ts ../input.txt

run-p2-watch year day:
    cd ./y{{year}}/d{{day}}/part2 && deno run --watch --allow-read main.ts ../input.txt
    
run-p2-example year day:
    cd ./y{{year}}/d{{day}}/part2 && deno run --watch --allow-read main.ts ../example.txt


run year day:
    @echo "Example 1"
    @cd ./y{{year}}/d{{day}}/part1 && deno run --allow-read main.ts ../example.txt
    @echo "\nExample 2"
    @cd ./y{{year}}/d{{day}}/part2 && deno run --allow-read main.ts ../example.txt
    @echo "\nActual 1"
    @cd ./y{{year}}/d{{day}}/part1 && deno run --allow-read main.ts ../input.txt
    @echo "\nActual 2"
    @cd ./y{{year}}/d{{day}}/part2 && deno run --allow-read main.ts ../input.txt