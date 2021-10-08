class IpTracker {
  constructor(limit = 100) {
    this.limit = limit

    this.clear()
  }

  clear() {
    this.counts = {}
    this.tops = [] // Ranked Ip addresses limited by limit
  }

  request_handled(ip) {
    this.counts[ip] = (this.counts[ip] || 0) + 1

    // Find the current rank of ip from the top
    let rank = 0

    while (rank < this.tops.length && this.tops[rank] !== ip) {
      rank += 1
    }

    // Shift to the right rank
    while (
      rank > 0 &&
      this.counts[ip] >= this.counts[this.tops[rank - 1]]
    ) {
      this.tops[rank] = this.tops[rank - 1]
      rank -= 1
    }
    this.tops[rank] = ip

    // Limit the length of top ip list
    this.tops.length = Math.min(this.tops.length, this.limit)
  }

  top100() {
    return this.tops
  }
}

const t = new IpTracker(5)

t.request_handled('145.87.2.110')
t.request_handled('145.87.2.109')
t.request_handled('145.87.2.109')
t.request_handled('145.87.2.108')
t.request_handled('145.87.2.109')
t.request_handled('145.87.2.108')
t.request_handled('145.87.2.107')
t.request_handled('145.87.2.107')
t.request_handled('145.87.2.110')
t.request_handled('145.87.2.106')
t.request_handled('145.87.2.106')
t.request_handled('145.87.2.106')
t.request_handled('145.87.2.106')

console.log(t.top100())
