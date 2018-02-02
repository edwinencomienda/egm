<template>
        <div style="width:100%">
            <v-card>
                <v-card-title>
                    Update Region
                    <v-spacer></v-spacer>
                    <v-btn color="default" router to="/dashboard/regions">
                        <v-icon dark left>keyboard_backspace</v-icon>
                        Back
                    </v-btn>
                </v-card-title>
                <item-form></item-form>
            </v-card>
        </div>
    </template>
    
    <script>
    import ItemForm from './form'
    
    export default {
      components: {
        'item-form': ItemForm
      }
    }
    </script>
    
    