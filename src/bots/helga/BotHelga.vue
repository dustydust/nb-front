<template>
    <div class="bot-body container max-w-2xl">
        <div class="flex head px-6">
            <div class="flex-none">
                <ListItemAvatar width="50" height="50" />
            </div>
            <div class="flex-1 w-64 self-center font-black">
                <div class="bot-info font-rubik pink-400 uppercase mt-2.5 ml-1.5">
                    <div class="name text-3xl leading-4">Helga</div>
                    <div class="short-description">CLICKBAIT HEADLINES</div>
                </div>
            </div>
        </div>

        <!-- STEP -->
        <div v-if="currentStep == 1" class="steps step-1 text-black">
            <div class="flex flex-col font-arvo px-6">
                <div class="instruction pt-5 pb-10 px-4">I’m ready to go. Let me know as much information as you can, and
                    I’ll give you 5 options.</div>
                <textarea class="rounded-2xl p-4 h-48 min-h-min border-2 border-black resize-none outline-none"
                    :value="inputText"
                    placeholder="Describe what your article or ideas is about, your target audience, and what you want to accomplish."
                    @input="inputText = $event.target.value"></textarea>
                <div class="flex flex-col gap-2.5 items-center">
                    <BButton class="mt-7" text="Generate Headlines" iconName="angle-right-b" iconPosition="right"
                        color="black" :disabled="inputText.length <= 0" :action="() => generateHeadlines()" />
                </div>
            </div>
        </div>
        <!-- STEP : END -->

        <!-- STEP -->
        <div v-if="currentStep == 2" class="steps step-2 text-black font-arvo">
            <div class="instruction pt-5 pb-10 px-8">Ok give me a few seconds. Even bots need to think ya know...</div>
        </div>
        <!-- STEP : END -->

        <!-- STEP -->
        <div v-if="currentStep == 3" class="steps step-3 text-black font-arvo overflow-hidden">
            <div class="instruction pt-5 pb-5 px-8">Tap to edit text, swipe to tell me what you think. Feedback makes me
                better!</div>
            <div class="relative h-48 min-h-min">
                <vue-swing 
                    @throwout="onThrowout"
                    :config="config" 
                    ref="vueswing"
                >
                        <!-- <div v-for="card in cards" :key="card" class="card">
                            <span class="absolute p-10 text-7xl rounded-2xl p-4 h-48 min-h-min border-2 border-black bg-gray-50">{{ card }}</span>
                        </div> -->
                    <div v-for="(headline, index) in headlines" :key="headline">
                        <!-- <div v-if="(index + 1) == currentHeadline"> -->
                            <div class="flex flex-col font-arvo px-6 card absolute w-full">
                                <textarea class="rounded-2xl p-4 h-48 min-h-min border-2 border-black resize-none outline-none"
                                    :value="headline" @input="correctHeadline(index, $event.target.value)"></textarea>
                            </div>
                        <!-- </div> -->
                    </div>
                </vue-swing>
            </div>
            <div class="flex px-6 mt-6 justify-center gap-14">
                <BButton size="small" text="Nah" iconName="times" iconPosition="left" color="white"
                    :action="() => setFeedback('negative')" />
                <BButton size="small" text="Yah" iconName="heart" iconPosition="left" color="white"
                    :action="() => setFeedback('positive')" />
            </div>
        </div>
        <!-- STEP : END -->

        <!-- STEP -->
        <div v-if="currentStep == 4" class="steps step-4 text-black font-arvo">
            <div class="instruction pt-5 pb-10 px-6">OK, feedback received. I can run this job again and produce better
                results.</div>
            <div class="flex flex-col gap-2.5 items-center">
                <BButton text="Copy to clipboard" iconName="align-left" iconPosition="left" color="white"
                    @click="() => copyLikedToClipboard()" />
                <BButton text="Mail results to me" iconName="envelope-alt" iconPosition="left" color="white"
                    @click="() => showMailForm()" />
                <div v-if="this.mailFormShowed" class="flex">
                    <input class="rounded-2xl py-1 px-4 min-h-min border-2 border-black outline-none"
                        placeholder="text@me.com" />
                    <BButton class="ml-3" size="small" text="Send" iconName="message" iconPosition="right" color="white" />
                </div>
                <BButton text="Re-Generate Headlines" iconName="angle-right-b" iconPosition="right" color="black"
                    :action="() => regenerateHeadlines()" />
            </div>
            <div class="text-2xl pink-400 font-rubik text-center font-black mt-14">YOUR REQUEST</div>
            <div class="text-base italic font-noto-sans px-12">{{ inputText }}</div>

            <div class="text-2xl pink-400 font-rubik text-center font-black mt-14">REVIEW OUTPUT</div>
            <div class="instruction pt-2 pb-2 text-center text-xl">Tap to edit text</div>

            <div class="flex flex-col gap-2.5 items-center ">
                <div v-for="(headline, index) in headlines" class="bg-gray-50 w-full p-8 flex relative" :key="index">
                    <span class="absolute top-3 right-3">
                        <BaseSvgIcon v-if="liked[index] > 0" class="cursor-pointer" name="nb-heart" fill="#E30B5C"
                            width="24" height="22" @click="() => setLikedHeadlineNumber('negative', index)" />
                        <BaseSvgIcon v-else class="cursor-pointer" name="nb-cross" fill="#000000" width="24" height="24"
                            @click="() => setLikedHeadlineNumber('positive', index)" />
                    </span>
                    <div class="text">
                        {{ headline }}
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2.5 items-center my-6">
                <BButton :text="'Re-Generate Headlines'" :iconName="'angle-right-b'" :iconPosition="'right'"
                    :color="'black'" :action="() => regenerateHeadlines()" />
            </div>
        </div>
        <!-- STEP : END -->
        <!-- STEP -->
        <div v-if="currentStep == 5" class="steps step-2 text-black font-arvo">
            <div class="instruction pt-5 pb-10 px-8">Whooops! Something went wrong! Try to wait for 5 seconds and try again!
                We will redirect you to start again.</div>
        </div>
        <!-- STEP : END -->
    </div>
</template>

<script>
import axios from 'axios'
import ListItemAvatar from '../_common/ListItemAvatar.vue'
import BButton from '../../components/BButton.vue'
import BaseSvgIcon from '../../components/BaseSvgIcon.vue'
import VueSwing from '../../modules/vue-swing'

export default {
    components: {
        ListItemAvatar,
        BButton,
        BaseSvgIcon,
        VueSwing
    },

    data() {
        return {
            currentStep: 1,
            currentHeadline: 0,
            inputText: "",
            feedbacks: { "positive": [], "negative": [] },
            headlines: [
                // '1I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
                // '2I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
                // '3I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
            ],
            correctedHeadlines: [
                // '1I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
                // '2I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
                // '3I’m ready to go. Let me know as much information as you can, and I’ll give you 5 options.',
            ],
            liked: [],
            mailFormShowed: false,
            maxAttempts: 20,
            config: {
                allowedDirections: [
                    VueSwing.Direction.LEFT,
                    VueSwing.Direction.RIGHT
                ],
                minThrowOutDistance: 550,
                maxThrowOutDistance: 700,
                maxRotation: 90,
                throwOutConfidence: (xOffset, yOffset, element) => {
                    const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
                    const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);
                    return Math.max(xConfidence, yConfidence) > 0.6 ? 1 : Math.max(xConfidence, yConfidence);
                }
            },
        }
    },

    methods: {
        generateHeadlines() {
            this.nextStep()
            this.fetchHeadlines()
        },
        regenerateHeadlines() {
            this.clearBotState()
            this.currentStep = 2
            this.fetchHeadlines()
        },
        showMailForm() {
            this.mailFormShowed = true
        },
        showError() {
            this.clearBotState()
            this.currentStep = 5
            setTimeout(() => { this.currentStep = 1 }, 4000)
        },
        clearBotState() {
            this.currentHeadline = 0
            this.feedbacks = { "positive": [], "negative": [] }
            this.headlines = []
            this.correctedHeadlines = []
            this.liked = []
        },
        nextStep() { this.currentStep++ },
        countHeadline() {
            this.currentHeadline++
            if (this.currentHeadline > this.headlines.length - 1) this.nextStep()
        },
        processFeedback(emotion) {
            this.setLikedHeadlineNumber(emotion, this.currentHeadline)
            this.feedbacks[emotion].push(this.correctedHeadlines[this.currentHeadline])
        },
        setFeedback(emotion) {
            this.swingRemoveCard(emotion)
            this.processFeedback(emotion)
        },
        setLikedHeadlineNumber(emotion, index) {
            emotion == 'positive' ? this.liked[index] = 1 : this.liked[index] = 0
        },
        correctHeadline(index, value) {
            this.correctedHeadlines[index] = value
        },
        copyLikedToClipboard() {
            let likedHeadlines = []
            let dislikedHeadlines = []
            for (let idx in this.liked) {
                if (this.liked[idx] > 0) {
                    likedHeadlines.push(this.headlines[idx])
                }
                else {
                    dislikedHeadlines.push(this.headlines[idx])
                }
            }
            navigator.clipboard.writeText(likedHeadlines.join('\n') + '\n\n' + dislikedHeadlines.join('\n'));
        },
        fetchHeadlines() {
            axios.post('https://OpenaiServer.denisleonov.repl.co/api/tasks/', { inputText: this.inputText, numHeadlines: 3, feedbacks: this.feedbacks })
                .then(response => {
                    let taskId = response.data.taskId
                    let attempt = 1
                    console.log('Task posted, current task id: ' + taskId)

                    const checkTaskCompletionInterval = setInterval(async () => {
                        const response = await axios.get(`https://OpenaiServer.denisleonov.repl.co/api/tasks/${taskId}`)

                        const taskStatus = response.data.status
                        switch (taskStatus) {
                            case 'done':
                                console.log('Task ' + taskId + 'is done!')
                                clearInterval(checkTaskCompletionInterval)
                                this.headlines = response.data.headlines;
                                this.correctedHeadlines = response.data.headlines;
                                this.nextStep()
                                break
                            case 'running':
                                console.log('Task ' + taskId + 'is still running...')
                                break
                            case 'new':
                                console.log('Task ' + taskId + 'is not running yet...')
                                break
                            case 'error':
                                console.log('Task ' + taskId + 'has error status :(')
                                clearInterval(checkTaskCompletionInterval)
                                this.showError()
                                break
                        }
                        attempt++
                        console.log("Attempt num is: ", attempt)
                        if (attempt > this.maxAttempts) {
                            clearInterval(checkTaskCompletionInterval)
                            this.showError()
                        }
                    }, 2000)
                })
                .catch(error => {
                    console.error(error);
                    this.showError()
                });
        },
        swingRemoveCard(emotion) {
            this.swing(emotion)
            setTimeout(() => {
                this.$refs.vueswing.cards.pop()
            }, 0)
        },
        swing(emotion) {
            let x = 0
            if (emotion == 'negative') x = -99999
            if (emotion == 'positive') x = 99999
            const cards = this.$refs.vueswing.cards
            cards[cards.length - 1].throwOut( x, 0 )
        },
        onThrowout({ target, throwDirection }) {
            if (throwDirection == VueSwing.Direction.LEFT) this.processFeedback('negative')
            if (throwDirection == VueSwing.Direction.RIGHT) this.processFeedback('positive')
            target.classList.add("hidden")
            this.$refs.vueswing.stack.getCard(target).destroy()
            this.countHeadline()
        }
    }
}
</script>