# Description

Imagine your team has developed a web service that receives requests from about 20 million unique IP addresses every day. You want to keep track of the IP addresses that are making the most requests to your service each day. Your job is to write a program that (1) tracks these IP addresses in memory (don’t use a database), and (2) returns the 100 most common IP addresses.

In the language of your choice, please implement these functions:

1. request_handled(ip_address)

   This function accepts a string containing an IP address like “145.87.2.109”. This function will be called by the web service every time it handles a request. The calling code is outside the scope of this project. Since it is being called very often, this function needs to have a fast runtime.

1. top100()

   This function should return the top 100 IP addresses by request count, with the highest traffic IP address first. This function also needs to be fast. Imagine it needs to provide a quick response (< 300ms) to display on a dashboard, even with 20 millions IP addresses. This is a very important requirement. Don’t forget to satisfy this requirement.

1. clear()

   Called at the start of each day to forget about all IP addresses and tallies.

# Summary

## What would you do differently if you had more time?

I bet this is the most optimal solution.

## What is the runtime complexity of each function?

1. request_handled(ip_address): O(limit), `limit` is the number of top IP addresses to track, say, 100.

1. top100(): O(1)

1. clear(): O(1)

## How does your code work?

### Data structure

1. `counts`: Hash that keeps track of IP addresses's counts keyed by IP address
1. `tops`: Top IP addresses ranked so far limited by 100 in length

### Algorithm

#### request_handled(ip_address)

1. Finds the count of the given ip address in `counts` hash and increase it by 1.
1. Updates the rank of the given ip address in `tops` array.

   1.1. Finds the current rank of the given ip address in `tops` array traversing from the start forwards. If it is not ranked, it will end up in the end of the list

   1.2. Shift the given ip address to the right rank by move backwards from the current rank until it finds the right rank for the given ip address.

   1.3. Limit the `tops` array length to 100.

The process of moving the given ip address to the corrent rank is similar to the one of bubble sort algorithm.

#### top100()

It simply returns the current `tops` array

#### clear()

It simply clears the `counts` hash and `tops` array

## What other approaches did you decide not to pursue?

The simplest approach is simply recording the count of IP addresses in hash in `request_handled(ip_address)` function.

But, to calculate the top IP addresses, you have to sort the IP addresses by its appearance count. The runtime complexity of sorting algorithm is O(n log(n)) at average. This will increase the runtime of top100() function enormously when there are 20 million unique IP addresses to sort.

So, I decided to keep the ranked array from the beginngin and update it every time new ip address is tracked.

## How would you test this?

You can start from the small array of random IP addresses, say 100 IP addresses with top limit as 10.
Then, you can calculate the result by using `Array#reduce` and `Array#sort` and compare it with the result of this algorithm.

For the robustness testing, you can generate the big array of random IP addresses with the predefiend occurences of each but in random order.
You can check the correctness of and measure the time of the last call of `request_handled()` and `top100()`.
