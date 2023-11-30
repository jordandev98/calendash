<script>
import {formatDuration} from "../service/date/TimeService.js";
import Icon from "@iconify/svelte";
import {eventStore} from "../store/eventStore.js";


let currentEvent

eventStore.subscribe(value => {
    currentEvent = value;
})

</script>
