/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

// Minha solução 29/12/2025
var findMedianSortedArrays = function (nums1, nums2) {
  let fullArray = [...nums1, ...nums2].sort((a, b) => a - b);

  let isEven = fullArray.length % 2;
  let indexOne = Math.floor(fullArray.length / 2);
  let media = 0;

  if (isEven == 0) {
    let valueOne = fullArray[indexOne];
    let valueTwo = fullArray[indexOne - 1];
    media = (valueOne + valueTwo) / 2;
  } else {
    media = fullArray[indexOne];
  }

  return media;
};

// Solução ideal
var findMedianSortedArrays = function (nums1, nums2) {
  const merged = [];
  let i = 0,
    j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }

  while (i < nums1.length) {
    merged.push(nums1[i]);
    i++;
  }

  while (j < nums2.length) {
    merged.push(nums2[j]);
    j++;
  }

  const mid = Math.floor(merged.length / 2);
  if (merged.length % 2 === 0) {
    return (merged[mid - 1] + merged[mid]) / 2;
  } else {
    return merged[mid];
  }
};
