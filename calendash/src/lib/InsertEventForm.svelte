<script>
import {formatDuration} from "../service/date/TimeService.ts";
import Icon from "@iconify/svelte";
import {payloadStore} from "../store/payloadStore.js";


let currentEvent

payloadStore.subscribe(value => {
    currentEvent = value;
})

</script>
