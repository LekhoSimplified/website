dirty_bit = false;

function Set_dirty_bit() {
   if (!window.onbeforeunload)
      window.onbeforeunload = function(e) {
         return 'There are unsnaved changes, are you sure you want to close the tab.';
      }

   dirty_bit = true
}

function Reset_dirty_bit() {
   window.onbeforeunload = null
   dirty_bit = false
 }

function Is_dirty() {
   return dirty_bit
}
