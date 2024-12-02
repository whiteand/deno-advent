

import { ascend } from "@std/data-structures"
import { maxBy } from '@std/collections'
import { assertEquals } from '@std/assert'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const reports = fileContent.split('\n').map(line => line.split(/\s+/g).map(Number))
  const res = Iterator.from(reports).filter(report => isSafe(report, 0)).reduce((a) => a + 1, 0)
  console.log(`Solution: ${res}`)
  // console.log(`Right solution: 321`)
}


function isSafe(report: number[], tolerates: number): boolean {
  let bad = 0
  let last = 0;
  const comparator = getComparatorValue(report, tolerates)
  for (let i = 1; i < report.length && bad <= tolerates;) {
    if (ascend(report[i], report[last]) === comparator && Math.abs(report[i] - report[last]) <= 3) {
      last = i
      i += 1;
      continue
    }
    bad += 1
    i += 1
  }
  if (bad <= tolerates) return true
  if (tolerates > 0) {
    report.reverse()
    report.pop()
    return isSafe(report, tolerates - 1)
  }
  return false
}

function getComparatorValue(report: number[], tolerates: number): 1 | -1 {
  let incs = 0
  const n = Math.min(tolerates + 2, report.length - 1)
  for (let i = 0; i < n; i++) {
    if (report[i] < report[i + 1]) {
      incs += 1
    }
  }
  if (incs >= n - incs) {
    return 1
  } else {
    return -1
  }
}
