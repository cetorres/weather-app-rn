import React from 'react'
import { Stack } from 'expo-router'
import { AppSettingsContextProvider } from './contexts/AppSettingsContext'

const RootLayout = () => {
  return (
    <AppSettingsContextProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: '', headerShadowVisible: false, contentStyle: {backgroundColor: '#fff'} }} />
        <Stack.Screen name="settings" options={{ title: 'Settings', headerBackTitleVisible: false, headerShadowVisible: false, contentStyle: { backgroundColor: '#fff' } }} />
        <Stack.Screen name="search" options={{ title: '', animation: 'fade', headerBackTitleVisible: false, headerShadowVisible: false, contentStyle: {backgroundColor: '#fff'} }} />
      </Stack>
    </AppSettingsContextProvider>
  )
}

export default RootLayout
