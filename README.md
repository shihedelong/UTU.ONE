# Goal
1. Read the data
2. Sort the cryptocurrencies by market value in descending order
3. Display relevant attributes, including price", "24-hour change difference", "7-day change difference" and 1-month change difference, 24-hour trading volume and market value.

![avatar](client/public/goal.png)

# Tech stack
- React.js
- Node.js
- express.js
- MongoDB


# Solving problems in the future
## 1. The difference in mobile and web app
There is a difference in react/react-native rendering. For long lists, react-native has components that only render the visible area, while react does not. It requires a virtual list. The react-peter-window library is recommended, and it can support automatic height.

In this way, react can also be the same as react-native components, only rendering the visible area

## 2. The most important high-frequency update problem
The front-end network layer may have to deal with sticky packets, and we don't care about the frequency of back-end message push
Drawing lessons from the ideas of PReact, Redis, and kafka, I plan to implement a message queue on the front end to consume regularly and update the interface.
```
import { _render } from '../reactDom/index';

import { enqueueSetState } from './setState';

export class Component {

  constuctor(props = {}) {
    this.state = {};
    this.props = props;
  }
  
  setState(stateChange) {
    const newState = Object.assign(this.state || {}, stateChange);
    console.log(newState,'newState')
    this.newState = newState;
    enqueueSetState(newState, this);
  }
  
}
```

After setState, enter the queue first, enter for the first time, the queue is empty, enter the judgment, call defer(flush) before rendering the next frame

```
export function enqueueSetState(stateChange, component) {

  //The first time you come in, you will definitely call the defer function first
  if (setStateQueue.length === 0) {
    defer(flush);
  }

  //add object in queue key:stateChange value:component
  setStateQueue.push({
    stateChange,
    component,
  });

  //If there is no such component in the render queue, add it
  if (!renderQueue.some((item) => item === component)) {
    renderQueue.push(component);
  }
}
```
defer
```
function defer(fn) {
  //High priority task asynchronous 
  return requestAnimationFrame(fn);
}
```
At this time, the message is pushed again, and enqueueSetState is triggered again, and the data is pushed to the queue at this time, and the consumption is unified in one frame. This is my research on financial apps and provides solutions to core problems. Only a solution is provided, and it is not implemented in the source code.

# Future use and addition of tech stack.

Next.js is definitely a must, because it needs to meet a large number of calculations, because similar financial billboards require a large number of requests and need to respond in a very short time, so as to ensure that the interests of investors will not be affected by web performance problems. Affected. So SSR is very and must be used in our future projects.

# Tech stack map to be used in the future

![avatar](client/public/techstackrm.png)

In the future, you need to reduce the dom size and configure docker on lixus. Docker takes time to configure.

