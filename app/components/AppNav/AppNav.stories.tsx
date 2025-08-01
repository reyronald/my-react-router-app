import type { Meta, StoryObj } from "@storybook/react"

import { useState } from "react"
import { AppNavMenu } from "./AppNav"

const meta = {
  title: "Components/AppNav",
  component: AppNavMenu,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    items: [
      {
        title: "Members",
        to: "/members",
        children: [
          {
            title: "Members",
            to: "/members",
          },
          {
            title: "Transactions",
            to: "/members/transactions",
          },
        ],
      },
      {
        title: "Bills",
        to: "/bills",
        children: [
          {
            title: "View & print bills",
            to: "/bills/view-print-bills",
          },
          {
            title: "View payment addresses",
            to: "/bills/view-payment-addresses",
          },
          {
            title: "Upload census",
            to: "/bills/upload-census",
          },
        ],
      },
      {
        title: "Payments",
        to: "/payments",
        children: [
          {
            title: "Make a payment",
            to: "/payments/make-a-payment",
          },
          {
            title: "Payment transactions",
            to: "/payments/payment-transactions",
          },
          {
            title: "Payment settings",
            to: "/payments/payment-settings",
          },
        ],
      },
      {
        title: "Claims",
        to: "/claims",
        children: [
          {
            title: "View claim status",
            to: "/claims/view-claim-status",
          },
          {
            title: "Action needed claims",
            to: "/claims/action-needed-claims",
          },
          {
            title: "Submit a new claim",
            to: "/claims/submit-a-new-claim",
          },
          {
            title: "Claims reports",
            to: "/claims/claims-reports",
          },
        ],
      },
      {
        title: "Evidence of insurability",
        to: "/eoi",
        children: [
          {
            title: "View EOI status",
            to: "/eoi/view-eoi-status",
          },
          {
            title: "Action needed EOI",
            to: "/eoi/action-needed-eoi",
          },
        ],
      },
      {
        title: "Policy documents",
        to: "/policy-documents",
      },
      {
        title: "Forms",
        to: "/forms",
      },
      {
        title: "Stop-Loss",
        to: "/medical-stop-loss",
        children: [
          {
            title: "Reporting",
            to: "/medical-stop-loss/reporting",
          },
          {
            title: "Information",
            to: "/medical-stop-loss/information",
          },
        ],
      },
    ],
    user: {
      fullName: "Ronald Rey",
      sponsorName: "ABC Company",
      email: "ronald.rey@example.com",
      items: [
        {
          title: "Accounts and settings",
          to: "/accounts-and-settings",
        },
        {
          title: "Data connection status",
          to: "/data-imports",
        },
        {
          title: "Sign out",
          to: "#",
        },
      ],
    },
  },
} satisfies Meta<typeof AppNavMenu>

export default meta

type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story

export const TurnItemsOnAndOff = {
  render: function Render(args) {
    const initialItems = args.items
    const user = args.user

    const [items, setItems] = useState(initialItems)

    const key = JSON.stringify(items)

    return (
      <>
        <AppNavMenu items={items} user={user} key={key} />

        <div className="container py-4">
          <form>
            {initialItems.map((item) => (
              <div key={item.title} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={item.title}
                  checked={items.some((i) => i.title === item.title)}
                  onChange={() => {
                    setItems((prevItems) => {
                      const exists = prevItems.some((i) => i.title === item.title)
                      const next = prevItems.slice()
                      if (exists) {
                        next.splice(
                          next.findIndex((i) => i.title === item.title),
                          1,
                        )
                      } else {
                        next.push(item)
                      }
                      const order = initialItems.map((i) => i.title)
                      next.sort((a, b) => {
                        return order.indexOf(a.title) - order.indexOf(b.title)
                      })
                      return next
                    })
                  }}
                />
                <label className="form-check-label" htmlFor={item.title}>
                  {item.title}
                </label>
              </div>
            ))}
          </form>
        </div>
      </>
    )
  },
} satisfies Story
