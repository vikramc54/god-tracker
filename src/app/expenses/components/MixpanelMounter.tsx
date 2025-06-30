"use client";

import mixpanel from "mixpanel-browser";
import { useEffect } from "react";

const mixpanelToken = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export default function MixpanelMounter() {
    useEffect(() => {
        if (!mixpanelToken) throw new Error("Missing env variable NEXT_PUBLIC_MIXPANEL_TOKEN");
        mixpanel.init(mixpanelToken);
    }, []);

    return null;
}