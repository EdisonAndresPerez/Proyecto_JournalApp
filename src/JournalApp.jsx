import React from "react";
import { AppRouter } from "./router/AppRouter";
import {AppTheme} from "./theme"

export default function JournalApp() {
  return (
    <> 
    <AppTheme>
      <AppRouter/>
    </AppTheme>

    </>
  )
}
