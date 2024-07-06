# Store on Interval Example

This example demonstrates how to use the `storeOnInterval` function to create a store that updates its state at a specified interval. The store is designed to persist data across intervals but does not save changes immediately upon each update unless specified.

## Overview

The `storeOnInterval` function is used to create a store with an initial state and a configuration object. The store's state can be updated using the `update` method, and the current state can be retrieved using the `getState` method.

In this example, the store is configured to update its state every 5000 milliseconds (5 seconds) but does not save (persist aka update storage) changes on each update (`saveOnChange: false`). The state consists of a `count` property, which is displayed on the webpage and can be updated through user interaction.
