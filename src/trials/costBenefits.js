// imports
import { eventCodes } from '../config/main'
import { photodiodeGhostBox, pdSpotEncode } from '../lib/markup/photodiode'
import { canvasSize, canvasSettings } from '../config/main'
import { drawText, drawSpike, drawFrame } from '../lib/balloon'

const CANVAS_SIZE = canvasSize
const canvasHTML = `<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" id="jspsych-canvas">
    Your browser does not support HTML5 canvas
  </canvas>`
const fixationHTML = `<div id="fixation-dot" class="color-white"> </div>`

const costBenefits = (duration, value, effort, high_effort) => {
  let stimulus = `<div class="effort-container">` + canvasHTML + fixationHTML + photodiodeGhostBox() + `</div>`

  return {
    type: 'call_function',
    async: true,
    func: (done) => {
      // send trigger events
      const code = eventCodes.costBenefits

      // add stimulus to the DOM
      document.getElementById('jspsych-content').innerHTML = stimulus
      // $('#jspsych-content').addClass('task-container')

      // set up canvas
      let canvas = document.querySelector('#jspsych-canvas');
      let ctx = canvas.getContext('2d');

      const canvasDraw = () => {
        // transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var inflateBy;
        var spikeHeight = [0, 0]
        for (let i =0 ; i < 2; i++)
        {
          if (high_effort[i]) {
              inflateBy = canvasSettings.frameDimensions[1] / 800
          }
          else {
              inflateBy = canvasSettings.frameDimensions[1] / 100
          }

          // how far should the spike be
          var targetDist = 2 * inflateBy * (effort[i] - 1);
          var balloonHeight = canvasSettings.balloonHeight;
          // distance of the spike from the top
          spikeHeight[i] = canvasSize - balloonHeight - targetDist;
        }

        drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[0], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawText(ctx, value[0], effort[0], canvasSettings.textXpos[0], canvasSettings.textYpos)
        drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[0], canvasSettings.spikeXpos[0], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
        
        drawFrame(ctx, canvasSettings.frameDimensions[0], canvasSettings.frameDimensions[1], canvasSettings.frameXpos[1], canvasSettings.frameYpos, canvasSettings.frameLinecolor, false)
        drawText(ctx, value[1], effort[1], canvasSettings.textXpos[1], canvasSettings.textYpos)
        drawSpike(ctx, canvasSettings.spikeWidth, spikeHeight[1], canvasSettings.spikeXpos[1], canvasSettings.spikeYpos, canvasSettings.frameLinecolor, canvasSettings.frameLinecolor, false)
        
      }

      canvasDraw()
      pdSpotEncode(code)
      setTimeout(
        () => {
          done()
        },
        duration)
    }
  }
}

export default costBenefits
