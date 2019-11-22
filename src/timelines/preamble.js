import instructions from '../trials/instructions'
import welcome from '../trials/welcome'
import experimentStart from '../trials/experimentStart'
import startCode from '../trials/startCode'
import userId from '../trials/userId'
import holdUpMarker from '../trials/holdUpMarker'
import { AT_HOME } from '../config/main'
import { practiceBlock1 } from '../config/practice'

console.log('at_home', AT_HOME)
console.log('env at home', process.env.REACT_APP_AT_HOME)
const preamble = {
  type: 'html_keyboard_response',
  stimulus: '',
  timeline:
    (AT_HOME) ?
    [welcome,
      instructions(practiceBlock1)] :
    [holdUpMarker(),
      startCode(),
      welcome,
      instructions(practiceBlock1)
    ]
}

export default preamble
